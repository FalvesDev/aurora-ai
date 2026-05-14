mod commands;
mod dvd;
mod crypto;

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .setup(|app| {
            dvd::start_watcher(app.handle().clone());
            Ok(())
        })
        .invoke_handler(tauri::generate_handler![
            commands::ping,
            commands::check_ollama,
            commands::create_ollama_model,
            commands::read_key_from_disc,
        ])
        .run(tauri::generate_context!())
        .expect("error while running Aurora");
}
