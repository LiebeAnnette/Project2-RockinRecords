import React, { useState } from "react";
import { useRecord } from "../context/recordContext";

interface RecordModalProps {
  closeModal: () => void;
}

const RecordModal: React.FC<RecordModalProps> = ({ closeModal }) => {
  const { addRecord } = useRecord();
  const [formData, setFormData] = useState({
    artist: "",
    album: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSpinner, setShowSpinner] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errors, setErrors] = useState<string[]>([]);

  const validateForm = () => {
    const newErrors = [];
    if (!formData.artist.trim()) newErrors.push("Artist is required.");
    if (!formData.album.trim()) newErrors.push("Album is required.");
    setErrors(newErrors);
    return newErrors.length === 0;
  };

  const submitRecord = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    setShowSpinner(true);
    setSuccessMessage("");
    setErrors([]);

    await addRecord(formData);

    setShowSpinner(false);
    setSuccessMessage("🎉 Record added successfully!");
    setFormData({ artist: "", album: "" });

    setTimeout(() => setIsSubmitting(false), 3000);
  };

  const handleAddAnother = () => {
    setFormData({ artist: "", album: "" });
    setSuccessMessage("");
  };

  const handleClose = () => {
    closeModal();
    setFormData({ artist: "", album: "" });
  };

  return (
    <div className="modal-overlay" onClick={closeModal}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h1>Add a New Record</h1>
        <form onSubmit={submitRecord} className="modal-form">
          <input
            className="modal-input"
            placeholder="Artist"
            value={formData.artist}
            onChange={(e) =>
              setFormData({ ...formData, artist: e.target.value })
            }
          />
          <input
            className="modal-input"
            placeholder="Album"
            value={formData.album}
            onChange={(e) =>
              setFormData({ ...formData, album: e.target.value })
            }
          />
          <button type="submit" disabled={isSubmitting} className="modal-btn">
            {isSubmitting ? "Submitting..." : "Submit"}
          </button>
        </form>

        {showSpinner && <div className="spinner">⏳</div>}

        {successMessage && (
          <div className="success-message">
            {successMessage}
            <div className="actions">
              <button onClick={handleAddAnother} className="btn">
                Add Another?
              </button>
              <button onClick={handleClose} className="btn">
                Close
              </button>
            </div>
          </div>
        )}

        {errors.length > 0 && (
          <div className="error-messages" aria-live="assertive">
            {errors.map((error, index) => (
              <div key={index}>• {error}</div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default RecordModal;
