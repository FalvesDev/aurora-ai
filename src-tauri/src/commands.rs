use std::process::Command;

#[tauri::command]
pub fn ping() -> String {
    "Aurora backend alive".to_string()
}

#[tauri::command]
pub async fn check_ollama() -> bool {
    let client = reqwest::Client::new();
    client
        .get("http://localhost:11434/api/tags")
        .timeout(std::time::Duration::from_secs(3))
        .send()
        .await
        .map(|r| r.status().is_success())
        .unwrap_or(false)
}

/// Create a custom Ollama model from a Modelfile on the disc.
/// Called once per disc on first use.
#[tauri::command]
pub async fn create_ollama_model(
    model_name: String,
    modelfile_path: String,
) -> Result<bool, String> {
    let output = Command::new("ollama")
        .args(["create", &model_name, "-f", &modelfile_path])
        .output()
        .map_err(|e| e.to_string())?;

    Ok(output.status.success())
}

/// Read the AES key from the disc (32 bytes, hex-encoded).
/// The key stays in RAM only while the disc is present.
#[tauri::command]
pub fn read_key_from_disc(disc_path: String) -> Result<String, String> {
    let key_path = std::path::Path::new(&disc_path).join("aurora.key");
    std::fs::read_to_string(&key_path).map_err(|e| e.to_string())
}
