import express from 'express';
import {
  convertRoman,
  getAllConversions,
  getConversionById,
  updateConversion,
  deleteConversion,
} from '../controllers/conversionsController.js';

const router = express.Router();

router.post('/convert', convertRoman);
router.get('/conversions', getAllConversions);
router.get('/conversions/:id', getConversionById);
router.put('/conversions/:id', updateConversion);
router.delete('/conversions/:id', deleteConversion);

export default router;
