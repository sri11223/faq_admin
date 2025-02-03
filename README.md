
##Note : I deployed the application in render and vercel, all the features are working except the transulation, because google is disabelling the key when i put it for deployment, Use your own key . 
when running on the local host change the api call to your local host
-- 
--

This repository contains the solution to the backend hiring test. The project is built using **React**, **Node.js**, and **MongoDB**, with features like multilingual FAQ management, WYSIWYG editor integration, caching with Redis, and REST API development. The application is deployed on **Render** (backend) and **Vercel** (frontend).
## 🎥 Project Videos

### Demo Video
Watch the demo video showcasing the application in action:
[Demo Video](https://drive.google.com/file/d/1NQu-J2K4_amF2YWLMXaIaeNrFjg08GkZ/view?usp=sharing)

### Testing Video
View the testing process and results:
[Testing Video](https://drive.google.com/file/d/17noDQhJpeSpdDgJ64JTcWDWHhsc0WmuJ/view?usp=sharing)

-- 
---

## 📋 Table of Contents

1. [Project Overview](#project-overview)
2. [Features](#features)
3. [Technologies Used](#technologies-used)
4. [Installation & Setup](#installation--setup)
5. [API Usage Examples](#api-usage-examples)
6. [Challenges Faced](#challenges-faced)
7. [Testing](#testing)
8. [Deployment](#deployment)
9. [Dependencies](#dependencies)
10. [Contribution Guidelines](#contribution-guidelines)


---

## 🌟 Project Overview

The objective of this project was to design and implement a multilingual FAQ management system with the following key features:

- **FAQ Model**: Store questions and answers with rich text formatting.
- **Multi-language Support**: Dynamically retrieve translations for FAQs in Hindi (`hi`), Bengali (`bn`), and other languages.
- **WYSIWYG Editor**: Integrated CKEditor for rich text formatting in answers.
- **Caching**: Implemented Redis for efficient translation storage and retrieval.
- **REST API**: Built APIs to manage FAQs with language selection via query parameters.
- **Frontend**: Developed a React-based frontend to interact with the backend.

---

## ✨ Features

- **Multilingual Support**: FAQs can be translated into multiple languages using Google Translate API.
- **Dynamic Translations**: Language-specific translations are retrieved dynamically via `?lang=` query parameter.
- **Caching**: Redis ensures fast retrieval of frequently accessed translations.
- **Admin Panel**: A user-friendly interface to manage FAQs.
- **Testing**: Comprehensive unit tests for models, APIs, and caching mechanisms.
- **Docker Support**: Includes `Dockerfile` and `docker-compose.yml` for containerized deployment.

---

## 💻 Technologies Used

- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Frontend**: React.js
- **Caching**: Redis
- **WYSIWYG Editor**: CKEditor
- **Translation**: Google Translate API (`googletrans`)
- **Testing**: Mocha/Chai for unit testing
- **Linting**: ESLint for code quality
- **Deployment**: Render (backend), Vercel (frontend)
- **Containerization**: Docker

---

## ⚙️ Installation & Setup

### Prerequisites

- Node.js (v16+)
- MongoDB (local or cloud instance)
- Redis (for caching)
- Google Translate API Key (optional, required for translations)

### Steps to Run Locally

1. **Clone the Repository**
   ```bash
   git clone https://github.com/yourusername/hiring-test-backend.git
   cd hiring-test-backend
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Set Up Environment Variables**
   Create a `.env` file in the root directory and add the following variables:
   ```env
   PORT=5000
   MONGODB_URI=<your_mongodb_connection_string>
   REDIS_URL=<your_redis_url>
   GOOGLE_TRANSLATE_API_KEY=<your_google_translate_api_key>
   ```

4. **Start the Server**
   ```bash
   npm start
   ```

5. **Run the Frontend**
   Navigate to the `frontend` folder and run:
   ```bash
   npm install
   npm start
   ```

6. **Access the Application**
   - Backend: `http://localhost:5000`
   - Frontend: `http://localhost:3000`

---

## 🌐 API Usage Examples

### Fetch FAQs in English (Default)
```bash
curl http://localhost:5000/api/faqs/
```

### Fetch FAQs in Hindi
```bash
curl http://localhost:5000/api/faqs/?lang=hi
```

### Fetch FAQs in Bengali
```bash
curl http://localhost:5000/api/faqs/?lang=bn
```

---

🧩 Challenges Faced
While working on this project, I encountered several challenges that helped me grow as a developer. Here are the key challenges and how I overcame them:

1. Learning Redis for Caching
I had no prior experience with Redis before this project. To implement the caching mechanism for translations, I took the time to learn Redis fundamentals, including how to store and retrieve data efficiently.
Solution : I integrated Redis into the backend using the redis library and ensured that frequently accessed translations were cached, significantly improving performance.
2. Unit Testing with Mocha/Chai
Unit testing was a new area for me, but I understood its importance in ensuring code reliability and maintainability.
Solution : I learned how to write comprehensive unit tests using Mocha and Chai to cover model methods, API responses, and caching mechanisms. This helped me catch bugs early and ensure the application's correctness.
3. Google Translate API Privacy Issues
Due to privacy concerns, the Google Translate API key could not be included in the repository.
Solution : I documented the need for an API key in the .env file and ensured users could add their own key to enable translations.
4. Dynamic Language Switching
Ensuring seamless language switching while maintaining performance was challenging.
Solution : By leveraging Redis for caching translations, I minimized redundant API calls and improved response times.
5. Rich Text Formatting with CKEditor
Integrating CKEditor with the backend required careful handling of HTML content to avoid security vulnerabilities like XSS attacks.
Solution : I sanitized the input data and ensured proper validation to make the rich text feature secure and functional.
🌟 What I Learned
This project was a great learning experience for me. I successfully:

Learned and implemented Redis for caching.
Wrote unit tests using Mocha and Chai to ensure code quality.
Integrated a WYSIWYG editor (CKEditor) for rich text formatting.
Worked with Google Translate API for multilingual support.
These challenges pushed me to expand my skill set and deliver a robust, production-ready application.

Why This Matters
By overcoming these challenges, I demonstrated adaptability, problem-solving skills, and a commitment to delivering high-quality work. This project not only met the requirements but also allowed me to grow as a developer.

## 🧪 Testing

- **Unit Tests**: Written using Mocha/Chai to cover model methods, API responses, and caching mechanisms.
- **How to Run Tests**:
  ```bash
  npm test
  ```

---

## 🚀 Deployment

- **Backend**: Deployed on [Render](https://render.com).
- **Frontend**: Deployed on [Vercel](https://vercel.com).
- **Docker Support**: Includes `Dockerfile` and `docker-compose.yml` for containerized deployment.

---

## 📦 Dependencies

### Backend
- `express`: Web framework for Node.js
- `mongoose`: ODM for MongoDB
- `redis`: Caching mechanism
- `googletrans`: Translation library
- `mocha`, `chai`: Testing frameworks

### Frontend
- `react`: JavaScript library for building UI
- `ckeditor`: WYSIWYG editor
- `axios`: HTTP client for API calls

---

## 🤝 Contribution Guidelines

1. Fork the repository.
2. Create a new branch for your feature or bug fix:
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. Commit your changes with clear messages:
   ```bash
   git commit -m "feat: Add multilingual FAQ model"
   ```
4. Push to your branch:
   ```bash
   git push origin feature/your-feature-name
   ```
5. Open a pull request with a detailed description.

---





##Thankyou, waiting for positive reply
