// Collects uncaught errors so each test can assert there were none.
window.__errs = [];
addEventListener('error', (e) => window.__errs.push(String(e.message || e)));
addEventListener('unhandledrejection', (e) => window.__errs.push(String(e.reason)));
