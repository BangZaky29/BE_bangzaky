const db = require('../config/database');

// GET all users
const getAllUsers = async (req, res, next) => {
  try {
    const [users] = await db.query('SELECT * FROM users ORDER BY created_at DESC');

    res.status(200).json({
      success: true,
      count: users.length,
      data: users
    });
  } catch (error) {
    next(error);
  }
};

// GET single user by ID
const getUserById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const [users] = await db.query('SELECT * FROM users WHERE id = ?', [id]);

    if (users.length === 0) {
      return res.status(404).json({
        success: false,
        error: { message: 'User not found' }
      });
    }

    // Get user's purchases
    const [purchases] = await db.query(
      `SELECT p.*, t.title as template_title, t.price 
       FROM purchases p 
       JOIN templates t ON p.template_id = t.id 
       WHERE p.user_id = ? 
       ORDER BY p.purchased_at DESC`,
      [id]
    );

    const user = users[0];
    user.purchases = purchases;

    res.status(200).json({
      success: true,
      data: user
    });
  } catch (error) {
    next(error);
  }
};

// POST create new user
const createUser = async (req, res, next) => {
  try {
    const { name, email } = req.body;

    // Validate required fields
    if (!name || !email) {
      return res.status(400).json({
        success: false,
        error: { message: 'Name and email are required' }
      });
    }

    // Check if email already exists
    const [existing] = await db.query('SELECT id FROM users WHERE email = ?', [email]);
    
    if (existing.length > 0) {
      return res.status(409).json({
        success: false,
        error: { message: 'Email already exists' }
      });
    }

    // Insert user
    const [result] = await db.query(
      'INSERT INTO users (name, email) VALUES (?, ?)',
      [name, email]
    );

    res.status(201).json({
      success: true,
      message: 'User created successfully',
      data: { id: result.insertId, name, email }
    });
  } catch (error) {
    next(error);
  }
};

// PUT update user
const updateUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, email } = req.body;

    // Check if user exists
    const [existing] = await db.query('SELECT id FROM users WHERE id = ?', [id]);
    
    if (existing.length === 0) {
      return res.status(404).json({
        success: false,
        error: { message: 'User not found' }
      });
    }

    // Check if email is taken by another user
    if (email) {
      const [emailCheck] = await db.query('SELECT id FROM users WHERE email = ? AND id != ?', [email, id]);
      
      if (emailCheck.length > 0) {
        return res.status(409).json({
          success: false,
          error: { message: 'Email already exists' }
        });
      }
    }

    // Update user
    await db.query(
      'UPDATE users SET name = ?, email = ? WHERE id = ?',
      [name, email, id]
    );

    res.status(200).json({
      success: true,
      message: 'User updated successfully'
    });
  } catch (error) {
    next(error);
  }
};

// DELETE user
const deleteUser = async (req, res, next) => {
  const connection = await db.getConnection();
  
  try {
    await connection.beginTransaction();

    const { id } = req.params;

    // Check if user exists
    const [existing] = await connection.query('SELECT id FROM users WHERE id = ?', [id]);
    
    if (existing.length === 0) {
      return res.status(404).json({
        success: false,
        error: { message: 'User not found' }
      });
    }

    // Delete user's purchases
    await connection.query('DELETE FROM purchases WHERE user_id = ?', [id]);
    
    // Delete user
    await connection.query('DELETE FROM users WHERE id = ?', [id]);

    await connection.commit();

    res.status(200).json({
      success: true,
      message: 'User deleted successfully'
    });
  } catch (error) {
    await connection.rollback();
    next(error);
  } finally {
    connection.release();
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser
};