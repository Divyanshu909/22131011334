// logger.test.js
import { logEvent } from './logger';

// Clear existing logs (optional for clean test)
localStorage.removeItem("logs");

// Test 1: Log a dummy event
logEvent("Test Event", { message: "This is a test" });

// Test 2: Log another event
logEvent("Shorten URL", {
  originalURL: "https://www.google.com",
  validity: "30 mins",
  shortcode: "ggl123"
});

// Test 3: Fetch and print logs
const logs = JSON.parse(localStorage.getItem("logs"));

console.log("=== Logging Middleware Test Output ===");
console.table(logs);
