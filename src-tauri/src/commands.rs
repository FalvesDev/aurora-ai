/// Simple health check — used to verify Tauri IPC is working
#[tauri::command]
pub fn ping() -> String {
    "Aurora backend alive".to_string()
}

/// Check if Ollama is running on localhost:11434
#[tauri::command]
pub async fn check_ollama() -> Result<bool, String> {
    let client = reqwest::Client::new();
    match client
        .get("http://localhost:11434/api/tags")
        .timeout(std::time::Duration::from_secs(3))
        .send()
        .await
    {
        Ok(r) => Ok(r.status().is_success()),
        Err(_) => Ok(false),
    }
}
