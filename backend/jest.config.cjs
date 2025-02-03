module.exports = {
    // Enable ESM support
    transform: {
      "^.+\\.js$": ["babel-jest", { presets: ["@babel/preset-env"] }],
    },
  
    // Mock non-JS files (e.g., CSS, images)
    moduleNameMapper: {
      "\\.(css|less|scss|sass)$": "identity-obj-proxy",
      "\\.(jpg|jpeg|png|gif|webp|svg)$": "<rootDir>/__mocks__/fileMock.js",
    },
  
    // Transform `node_modules` if necessary
    transformIgnorePatterns: [
      "node_modules/(?!(chai|other-esm-package)/)", // Add packages here if needed
    ],
  };