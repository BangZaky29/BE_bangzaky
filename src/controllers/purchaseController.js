const db = require('../config/database');

// GET all purchases
const getAllPurchases = async (req, res, next) => {
  try {
    const [purchases] = await db.query(
      `SELECT p.*, u.name as user_name, u.email as user_email, 
              t.title as template_title, t.price as template_price
       FROM purchases p
       JOIN users u ON p.user_id = u.id
       JOIN templates t ON p.template_id = t.id
       ORDER BY p.purchased_at DESC`
    );

    res.status(200).json({
      success: true,
      count: purchases.length,
      data: purchases
    });
  } catch (error) {
    next(error);
  }
};

// GET single purchase by ID
const getPurchaseById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const [purchases] = await db.query(
      `SELECT p.*, u.name as user_name, u.email as user_email, 
              t.title as template_title, t.price as template_price, t.description, t.image_url
       FROM purchases p
       JOIN users u ON p.user_id = u.id
       JOIN templates t ON p.template_id = t.id
       WHERE p.id = ?`,
      [id]
    );

    if (purchases.length === 0) {
      return res.status(404).json({
        success: false,
        error: { message: 'Purchase not found' }
      });
    }

    res.status(200).json({
      success: true,
      data: purchases[0]
    });
  } catch (error) {
    next(error);
  }
};

// GET purchases by user ID
const getPurchasesByUserId = async (req, res, next) => {
  try {
    const { userId } = req.params;

    const [purchases] = await db.query(
      `SELECT p.*, t.title as template_title, t.price as template_price, 
              t.image_url, t.category, t.type
       FROM purchases p
       JOIN templates t ON p.template_id = t.id
       WHERE p.user_id = ?
       ORDER BY p.purchased_at DESC`,
      [userId]
    );

    res.status(200).json({
      success: true,
      count: purchases.length,
      data: purchases
    });
  } catch (error) {
    next(error);
  }
};

// POST create new purchase
const createPurchase = async (req, res, next) => {
  try {
    const { user_id, template_id } = req.body;

    // Validate required fields
    if (!user_id || !template_id) {
      return res.status(400).json({
        success: false,
        error: { message: 'User ID and Template ID are required' }
      });
    }

    // Check if user exists
    const [userCheck] = await db.query('SELECT id FROM users WHERE id = ?', [user_id]);
    if (userCheck.length === 0) {
      return res.status(404).json({
        success: false,
        error: { message: 'User not found' }
      });
    }

    // Check if template exists
    const [templateCheck] = await db.query('SELECT id FROM templates WHERE id = ?', [template_id]);
    if (templateCheck.length === 0) {
      return res.status(404).json({
        success: false,
        error: { message: 'Template not found' }
      });
    }

    // Check if user already purchased this template
    const [duplicateCheck] = await db.query(
      'SELECT id FROM purchases WHERE user_id = ? AND template_id = ?',
      [user_id, template_id]
    );
    
    if (duplicateCheck.length > 0) {
      return res.status(409).json({
        success: false,
        error: { message: 'User has already purchased this template' }
      });
    }

    // Insert purchase
    const [result] = await db.query(
      'INSERT INTO purchases (user_id, template_id) VALUES (?, ?)',
      [user_id, template_id]
    );

    res.status(201).json({
      success: true,
      message: 'Purchase created successfully',
      data: { 
        id: result.insertId,
        user_id,
        template_id
      }
    });
  } catch (error) {
    next(error);
  }
};

// DELETE purchase
const deletePurchase = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Check if purchase exists
    const [existing] = await db.query('SELECT id FROM purchases WHERE id = ?', [id]);
    
    if (existing.length === 0) {
      return res.status(404).json({
        success: false,
        error: { message: 'Purchase not found' }
      });
    }

    // Delete purchase
    await db.query('DELETE FROM purchases WHERE id = ?', [id]);

    res.status(200).json({
      success: true,
      message: 'Purchase deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllPurchases,
  getPurchaseById,
  getPurchasesByUserId,
  createPurchase,
  deletePurchase
};