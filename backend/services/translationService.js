import { TranslationServiceClient } from '@google-cloud/translate';
import dotenv from 'dotenv';

dotenv.config();

// Initialize the Translation Service Client
const translationClient = new TranslationServiceClient({
  keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS, // Path to your Google Cloud credentials file
});

/**
 * Translates text into the target language.
 * @param {string} text - The text to translate.
 * @param {string} targetLang - The target language code (e.g., 'hi' for Hindi, 'bn' for Bengali).
 * @returns {Promise<string>} - The translated text.
 */
export const translateText = async (text, targetLang) => {
  try {
    if (!text || !targetLang) {
      throw new Error('Text and target language are required');
    }

    // Define the request for translation
    const request = {
      parent: `projects/${process.env.GOOGLE_PROJECT_ID}/locations/global`,
      contents: [text],
      mimeType: 'text/plain', // Mime type of the text
      targetLanguageCode: targetLang, // Target language code
    };

    // Call the Google Cloud Translation API
    const [response] = await translationClient.translateText(request);

    // Extract the translated text
    if (response.translations && response.translations.length > 0) {
      return response.translations[0].translatedText;
    } else {
      throw new Error('No translation found');
    }
  } catch (error) {
    console.error('Translation error:', error);
    throw error; // Re-throw the error for handling in the controller
  }
};