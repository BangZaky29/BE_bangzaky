const db = require('../config/database');

// GET all bank info
const getAllBankInfo = async (req, res, next) => {
  try {
    const [bankInfo] = await db.query('SELECT * FROM bank_info');

    res.status(200).json({
      success: true,
      count: bankInfo.length,
      data: bankInfo
    });
  } catch (error) {
    next(error);
  }
};

// GET single bank info by ID
const getBankInfoById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const [bankInfo] = await db.query('SELECT * FROM bank_info WHERE id = ?', [id]);

    if (bankInfo.length === 0) {
      return res.status(404).json({
        success: false,
        error: { message: 'Bank info not found' }
      });
    }

    res.status(200).json({
      success: true,
      data: bankInfo[0]
    });
  } catch (error) {
    next(error);
  }
};

// POST create new bank info
const createBankInfo = async (req, res, next) => {
  try {
    const { bank_name, account_number, account_name } = req.body;

    // Validate required fields
    if (!bank_name || !account_number || !account_name) {
      return res.status(400).json({
        success: false,
        error: { message: 'All fields are required' }
      });
    }

    // Insert bank info
    const [result] = await db.query(
      'INSERT INTO bank_info (bank_name, account_number, account_name) VALUES (?, ?, ?)',
      [bank_name, account_number, account_name]
    );

    res.status(201).json({
      success: true,
      message: 'Bank info created successfully',
      data: { 
        id: result.insertId,
        bank_name,
        account_number,
        account_name
      }
    });
  } catch (error) {
    next(error);
  }
};

// PUT update bank info
const updateBankInfo = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { bank_name, account_number, account_name } = req.body;

    // Check if bank info exists
    const [existing] = await db.query('SELECT id FROM bank_info WHERE id = ?', [id]);
    
    if (existing.length === 0) {
      return res.status(404).json({
        success: false,
        error: { message: 'Bank info not found' }
      });
    }

    // Update bank info
    await db.query(
      'UPDATE bank_info SET bank_name = ?, account_number = ?, account_name = ? WHERE id = ?',
      [bank_name, account_number, account_name, id]
    );

    res.status(200).json({
      success: true,
      message: 'Bank info updated successfully'
    });
  } catch (error) {
    next(error);
  }
};

// DELETE bank info
const deleteBankInfo = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Check if bank info exists
    const [existing] = await db.query('SELECT id FROM bank_info WHERE id = ?', [id]);
    
    if (existing.length === 0) {
      return res.status(404).json({
        success: false,
        error: { message: 'Bank info not found' }
      });
    }

    // Delete bank info
    await db.query('DELETE FROM bank_info WHERE id = ?', [id]);

    res.status(200).json({
      success: true,
      message: 'Bank info deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllBankInfo,
  getBankInfoById,
  createBankInfo,
  updateBankInfo,
  deleteBankInfo
};