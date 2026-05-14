import type { Skill } from "../../types/skill";
import "./DVDStatus.css";

interface Props {
  skill: Skill;
}

export function DVDStatus({ skill }: Props) {
  return (
    <div className="dvd-status">
      <div className="dvd-status__disc">
        <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="16" cy="16" r="14" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 2" />
          <circle cx="16" cy="16" r="9" stroke="currentColor" strokeWidth="1" />
          <circle cx="16" cy="16" r="2" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="16" cy="16" r="0.5" fill="currentColor" />
        </svg>
      </div>
      <div className="dvd-status__info">
        <span className="dvd-status__label">SKILL</span>
        <span className="dvd-status__name glow">{skill.name}</span>
      </div>
      <div className="dvd-status__model">{skill.model}</div>
      <div className="dvd-status__dot" />
    </div>
  );
}
