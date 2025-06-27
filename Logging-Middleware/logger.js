// logging-middleware/logger.js

const logs = [];

export function logEvent(actionType, payload) {
  const logEntry = {
    timestamp: new Date().toISOString(),
    actionType,
    payload
  };

  logs.push(logEntry);
  localStorage.setItem("app_logs", JSON.stringify(logs));
}

export function getLogs() {
  return logs;
}
