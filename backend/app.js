import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import {connectDB} from './config/database.js';
import faqRoutes from './routes/faqRoutes.js';

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Database Connection
connectDB();

// Routes
app.use('/api/faqs', faqRoutes);

// Error Handling Middleware
app.use((err, req, res) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
export default app;