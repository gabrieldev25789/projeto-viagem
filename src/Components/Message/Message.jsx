import "./Message.css"

function Message({ message, type = "add" }) {
  const isErro = type === "erro";

  return (
    <div style={{ display: "flex", justifyContent: "center", padding: "1rem" }}>
      <div className={`toast ${type}`}>
        <div className="toast-icon">
          {isErro ? (
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="#A32D2D" strokeWidth="2" strokeLinecap="round">
              <circle cx="8" cy="8" r="6.5"/>
              <line x1="8" y1="5" x2="8" y2="8.5"/>
              <circle cx="8" cy="11" r="0.5" fill="#A32D2D" stroke="none"/>
            </svg>
          ) : (
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="#085041" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="8" cy="8" r="6.5"/>
              <polyline points="5,8.5 7,10.5 11,6"/>
            </svg>
          )}
        </div>
        <strong className="toast-title">{message}</strong>
      </div>
    </div>
  );
}

export default Message