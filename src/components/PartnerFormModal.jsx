import "../styles/PartnerFormModal.css";

function PartnerFormModal({ onClose }) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>Partner with oladoc</h3>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>

        <input placeholder="Your name (e.g Muhammad Hassan)" />
        <input placeholder="Company name (e.g oladoc)" />
        <input placeholder="Contact number (e.g +92300xxxxxx)" />
        <input placeholder="Your email (e.g hassan@company.com)" />

        <button className="submit-btn">Submit</button>
      </div>
    </div>
  );
}

export default PartnerFormModal;
