import "./NoSkill.css";

export function NoSkill() {
  return (
    <div className="no-skill">
      <div className="no-skill__content boot-in">
        <div className="no-skill__logo">
          <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="60" cy="60" r="56" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" />
            <circle cx="60" cy="60" r="40" stroke="currentColor" strokeWidth="1.5" />
            <circle cx="60" cy="60" r="6" stroke="currentColor" strokeWidth="2" />
            <circle cx="60" cy="60" r="2" fill="currentColor" />
            <line x1="60" y1="20" x2="60" y2="54" stroke="currentColor" strokeWidth="1" />
            <line x1="60" y1="66" x2="60" y2="100" stroke="currentColor" strokeWidth="1" />
            <line x1="20" y1="60" x2="54" y2="60" stroke="currentColor" strokeWidth="1" />
            <line x1="66" y1="60" x2="100" y2="60" stroke="currentColor" strokeWidth="1" />
          </svg>
        </div>

        <div className="no-skill__text">
          <p className="no-skill__title glow-strong">AURORA</p>
          <p className="no-skill__subtitle">v0.1.0 — Local AI System</p>
          <div className="no-skill__divider" />
          <p className="no-skill__message">
            <span className="no-skill__prompt">SYS</span>
            {" "}No skill disc detected.
          </p>
          <p className="no-skill__message">
            <span className="no-skill__prompt">SYS</span>
            {" "}Insert a DVD-R skill disc to continue.
          </p>
          <div className="no-skill__divider" />
          <p className="no-skill__hint">
            <span className="no-skill__prompt">&gt;</span>
            {" "}Without a disc, I have no soul.
            <span className="cursor" />
          </p>
        </div>

        <div className="no-skill__status">
          <span className="no-skill__dot no-skill__dot--offline" />
          <span>OFFLINE — awaiting skill disc</span>
        </div>
      </div>
    </div>
  );
}
