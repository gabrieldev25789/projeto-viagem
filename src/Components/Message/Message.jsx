import { useEffect } from "react";
import "./Message.css";

// ─────────────────────────────────────────────
// COMPONENT: Message
// Modal de feedback — sucesso ou erro
// Props:
//   message     → texto principal exibido
//   description → texto secundário opcional
//   type        → "add" (sucesso) | "erro" (erro) — padrão: "add"
//   isOpen      → controla visibilidade
//   onClose     → função para fechar o modal
// ─────────────────────────────────────────────
function Message({ message, description, type = "add", isOpen, onClose }) {

  const isErro = type === "erro" // atalho para alternar ícone e estilo

  // Fecha o modal ao pressionar Escape
  useEffect(() => {
    const handleKey = (e) => e.key === "Escape" && onClose?.();
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [onClose]);

  // Trava o scroll do body enquanto o modal estiver aberto
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    // Backdrop: clique fora do modal também fecha
    <div
      className="modal-backdrop"
      onClick={(e) => e.target === e.currentTarget && onClose?.()}
    >
      <div className={`modal ${type}`} role="dialog" aria-modal="true">

        {/* Botão de fechar */}
        <button className="modal-close" onClick={onClose} aria-label="Fechar">×</button>

        {/* Ícone dinâmico — exclamação p/ erro, check p/ sucesso */}
        <div className="modal-icon">
          {isErro ? (
            <svg width="28" height="28" viewBox="0 0 16 16" fill="none"
              stroke="#A32D2D" strokeWidth="2" strokeLinecap="round">
              <circle cx="8" cy="8" r="6.5" />
              <line x1="8" y1="5" x2="8" y2="8.5" />       {/* traço vertical */}
              <circle cx="8" cy="11" r="0.5" fill="#A32D2D" stroke="none" /> {/* ponto */}
            </svg>
          ) : (
            <svg width="28" height="28" viewBox="0 0 16 16" fill="none"
              stroke="#085041" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="8" cy="8" r="6.5" />
              <polyline points="5,8.5 7,10.5 11,6" /> {/* checkmark */}
            </svg>
          )}
        </div>

        <strong className="modal-title">{message}</strong>
        {description && <p className="modal-description">{description}</p>}

      </div>
    </div>
  );
}

export default Message;
