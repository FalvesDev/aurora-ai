//! DVD watcher — Phase 3
//! Detects when an Aurora skill disc is inserted or removed.
//! Uses Windows WM_DEVICECHANGE via polling for now.
//!
//! When a disc with /AURORA_SKILL/skill.json is detected,
//! emits a Tauri event: "dvd://skill-loaded" with the skill data.
//! When the disc is removed, emits: "dvd://skill-removed"

// Implementation in Phase 3
