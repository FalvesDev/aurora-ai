mod commands;
mod dvd;
mod crypto;

use tauri::Manager;

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .setup(|app| {
            // TODO (Phase 3): Start DVD watcher thread
            // dvd::start_watcher(app.handle().clone());
            Ok(())
        })
        .invoke_handler(tauri::generate_handler![
            commands::ping,
            commands::check_ollama,
            // TODO (Phase 3): commands::get_skill_from_disc
            // TODO (Phase 4): commands::decrypt_memory, commands::encrypt_memory
            // TODO (Phase 5): commands::execute_code
        ])
        .run(tauri::generate_context!())
        .expect("error while running Aurora");
}
