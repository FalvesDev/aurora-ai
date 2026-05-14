//! AES-256-GCM memory encryption — Phase 4
//! Each skill disc contains an aurora.key file with a 32-byte key.
//! This module encrypts/decrypts the memory .enc files with that key.
//!
//! The key is NEVER written to disk by the app.
//! It lives in RAM only while the disc is physically present.

// Implementation in Phase 4
