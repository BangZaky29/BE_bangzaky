const express = require('express');
const router = express.Router();
const {
  getAllBankInfo,
  getBankInfoById,
  createBankInfo,
  updateBankInfo,
  deleteBankInfo
} = require('../controllers/bankInfoController');

// Routes
router.get('/', getAllBankInfo);
router.get('/:id', getBankInfoById);
router.post('/', createBankInfo);
router.put('/:id', updateBankInfo);
router.delete('/:id', deleteBankInfo);

module.exports = router;