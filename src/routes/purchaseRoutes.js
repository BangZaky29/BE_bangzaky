const express = require('express');
const router = express.Router();
const {
  getAllPurchases,
  getPurchaseById,
  getPurchasesByUserId,
  createPurchase,
  deletePurchase
} = require('../controllers/purchaseController');

// ✅ ROUTE SPESIFIK DULU
router.get('/user/:userId', getPurchasesByUserId);

// BARU YANG GENERIC
router.get('/', getAllPurchases);
router.get('/:id', getPurchaseById);

router.post('/', createPurchase);
router.delete('/:id', deletePurchase);

module.exports = router;
