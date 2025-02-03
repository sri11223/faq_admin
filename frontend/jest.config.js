module.exports = {
  // Transform JavaScript and JSX files using Babel
  transform: {
    "^.+\\.jsx?$": "babel-jest" // Handles both .js and .jsx files
  },
  // Allow transformation of specific modules in node_modules
  transformIgnorePatterns: [
    "node_modules/(?!(lodash-es|quill|react-bootstrap|@restart/ui)/)"
  ],
  // Mock non-JS files (e.g., CSS, images)
  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
    "\\.(jpg|jpeg|png|gif|webp|svg)$": "<rootDir>/__mocks__/fileMock.js"
  },
  testEnvironment: "jsdom", // Use jsdom for browser-like environment
  moduleFileExtensions: ["js", "jsx", "json", "node"] // Add 'jsx' to supported extensions
};