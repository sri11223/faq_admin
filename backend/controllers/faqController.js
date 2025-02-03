import FAQ from '../models/FAQ.js';
import { translateText } from '../services/translationService.js';
import { cache } from '../config/redis.js';
import logger from '../config/logger.js';

export const createFAQ = async (req, res) => {
  try {
    const { question_en, answer_en } = req.body;

    // Validate request body
    if (!question_en || !answer_en) {
      return res.status(400).json({ error: 'question_en and answer_en are required' });
    }

    // Translate the FAQ
    let question_hi, question_bn, answer_hi, answer_bn;
    try {
      [question_hi, question_bn, answer_hi, answer_bn] = await Promise.all([
        translateText(question_en, 'hi'),
        translateText(question_en, 'bn'),
        translateText(answer_en, 'hi'),
        translateText(answer_en, 'bn'),
      ]);
    } catch (translationError) {
      logger.error('Translation failed:', translationError);
      // Fallback to English if translation fails
      question_hi = question_en;
      question_bn = question_en;
      answer_hi = answer_en;
      answer_bn = answer_en;
    }

    // Save the FAQ to the database
    const faq = new FAQ({
      question_en,
      answer_en,
      question_hi,
      question_bn,
      answer_hi,
      answer_bn,
    });

    await faq.save({ writeConcern: { w: 'majority' } });

    // Invalidate the cache for FAQs
    await cache.del('faqs:*');
    logger.info(`Cache invalidated for FAQs after creating new FAQ: ${faq._id}`);

    res.status(201).json(faq);
  } catch (error) {
    logger.error('Error in createFAQ:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getFAQs = async (req, res) => {
  try {
    const lang = req.query.lang || 'en';
    const cacheKey = `faqs:${lang}`;

    // Force cache refresh (optional: only do this when needed)
    await cache.del(cacheKey); 

    // Check cache first
    const cachedFAQs = await cache.get(cacheKey);

    if (cachedFAQs) {
      return res.json(JSON.parse(cachedFAQs));
    }

    // Fetch fresh data from MongoDB
    const faqs = await FAQ.find();

    // Map to correct language
    const response = faqs.map(faq => ({
      id: faq._id,
      question: faq[`question_${lang}`] || faq.question_en,
      answer: faq[`answer_${lang}`] || faq.answer_en,
    }));

    // Store in cache for 15 minutes
    await cache.set(cacheKey, JSON.stringify(response), 'EX', 900);

    res.json(response);
  } catch (error) {
    console.error('Error fetching FAQs:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const updateFAQ = async (req, res) => {
  try {
    const { id } = req.params;
    const { question_en, answer_en } = req.body;
    // Validate request body
    if (!question_en || !answer_en) {
      return res.status(400).json({ error: 'question_en and answer_en are required' });
    }

    // Find and update the FAQ
    const updatedFAQ = await FAQ.findByIdAndUpdate(
      id,
      { question_en, answer_en },
      { new: true } // Return the updated document
    );

    if (!updatedFAQ) {
      return res.status(404).json({ error: 'FAQ not found' });
    }

    // Invalidate the cache for FAQs
    await cache.del('faqs:*');
    logger.info(`Cache invalidated for FAQs after updating FAQ: ${updatedFAQ._id}`);

    res.json(updatedFAQ);
  } catch (error) {
    logger.error('Error updating FAQ:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Delete an FAQ
export const deleteFAQ = async (req, res) => {
  try {
    const { id } = req.params;
console.log(id)
    // Find and delete the FAQ
    const deletedFAQ = await FAQ.findByIdAndDelete(id);
console.log(deleteFAQ)
    if (!deletedFAQ) {
      return res.status(404).json({ error: 'FAQ not found' });
    }

    // Invalidate the cache for FAQs
    await cache.del('faqs:*');
    logger.info(`Cache invalidated for FAQs after deleting FAQ: ${deletedFAQ._id}`);

    res.json({ message: 'FAQ deleted successfully' });
  } catch (error) {
    logger.error('Error deleting FAQ:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};