import "./NoSkill.css";

export function NoSkill() {
  return (
    <div className="no-skill">
      <div className="no-skill__inner">

        <div className="no-skill__icon">
          <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="60" cy="60" r="56" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 3" />
            <circle cx="60" cy="60" r="40" stroke="currentColor" strokeWidth="1" />
            <circle cx="60" cy="60" r="6"  stroke="currentColor" strokeWidth="2" />
            <circle cx="60" cy="60" r="2"  fill="currentColor" />
            <line x1="60" y1="20" x2="60" y2="54" stroke="currentColor" strokeWidth="1" />
            <line x1="60" y1="66" x2="60" y2="100" stroke="currentColor" strokeWidth="1" />
            <line x1="20" y1="60" x2="54" y2="60" stroke="currentColor" strokeWidth="1" />
            <line x1="66" y1="60" x2="100" y2="60" stroke="currentColor" strokeWidth="1" />
          </svg>
        </div>

        <div>
          <p className="no-skill__title">AURORA</p>
          <p className="no-skill__tagline">v0.1.0 — local ai system</p>
        </div>

        <div className="no-skill__terminal">
          <p className="no-skill__line no-skill__line--dim">
            <span className="no-skill__prefix">SYS</span>
            Nenhum disco de skill detectado.
          </p>
          <p className="no-skill__line">
            <span className="no-skill__prefix">SYS</span>
            Insira um DVD-R de skill para continuar.
          </p>
          <p className="no-skill__prompt">
            &gt; Sem disco, não tenho alma.<span className="cursor" />
          </p>
        </div>

        <div className="no-skill__status">
          <span className="no-skill__dot" />
          OFFLINE — aguardando disco
        </div>

      </div>
    </div>
  );
}
