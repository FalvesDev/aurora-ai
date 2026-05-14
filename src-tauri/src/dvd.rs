use std::path::PathBuf;
use std::thread;
use std::time::Duration;
use tauri::{AppHandle, Emitter};

const SKILL_FOLDER: &str = "AURORA_SKILL";
const SKILL_JSON: &str = "skill.json";
const SYSTEM_PROMPT: &str = "system_prompt.md";
const AURORA_KEY: &str = "aurora.key";
const POLL_INTERVAL_SECS: u64 = 2;

#[derive(serde::Serialize, serde::Deserialize, Clone, Debug)]
pub struct DiscPayload {
    pub skill_json: String,
    pub system_prompt: String,
    pub has_key: bool,
    pub disc_path: String,
}

pub fn start_watcher(app: AppHandle) {
    thread::spawn(move || {
        let mut last_disc: Option<String> = None;

        loop {
            let found = find_skill_disc();

            match (&last_disc, &found) {
                (None, Some(path)) => {
                    if let Some(payload) = read_disc(path) {
                        let _ = app.emit("dvd://skill-loaded", payload);
                    }
                    last_disc = Some(path.to_string_lossy().to_string());
                }
                (Some(prev), None) => {
                    let _ = app.emit("dvd://skill-removed", prev.clone());
                    last_disc = None;
                }
                (Some(prev), Some(current)) => {
                    // Different disc inserted
                    if prev != &current.to_string_lossy().to_string() {
                        let _ = app.emit("dvd://skill-removed", prev.clone());
                        if let Some(payload) = read_disc(current) {
                            let _ = app.emit("dvd://skill-loaded", payload);
                        }
                        last_disc = Some(current.to_string_lossy().to_string());
                    }
                }
                _ => {}
            }

            thread::sleep(Duration::from_secs(POLL_INTERVAL_SECS));
        }
    });
}

fn find_skill_disc() -> Option<PathBuf> {
    for letter in ['D', 'E', 'F', 'G', 'H', 'I', 'J'] {
        let skill_path = PathBuf::from(format!("{}:\\{}", letter, SKILL_FOLDER));
        if skill_path.exists() && skill_path.join(SKILL_JSON).exists() {
            return Some(skill_path);
        }
    }
    None
}

fn read_disc(path: &PathBuf) -> Option<DiscPayload> {
    let skill_json = std::fs::read_to_string(path.join(SKILL_JSON)).ok()?;

    let system_prompt = std::fs::read_to_string(path.join(SYSTEM_PROMPT))
        .unwrap_or_else(|_| String::new());

    let has_key = path.join(AURORA_KEY).exists();

    Some(DiscPayload {
        skill_json,
        system_prompt,
        has_key,
        disc_path: path.to_string_lossy().to_string(),
    })
}
