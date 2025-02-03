import express from 'express';
import {
  createFAQ,
  getFAQs,
  updateFAQ,
  deleteFAQ,
} from '../controllers/faqController.js';

const router = express.Router();

// Create a new FAQ
router.post('/', createFAQ);

// Get all FAQs
router.get('/', getFAQs);

// Update an FAQ
router.put('/:id', updateFAQ);

// Delete an FAQ
router.delete('/:id', deleteFAQ);

export default router;