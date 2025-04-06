import React, { useState } from 'react';

interface RecordModalProps {
    closeModal: () => void;
}

const RecordModal: React.FC<RecordModalProps> = ({ closeModal }) => {
    const [formData, setFormData] = useState({
        artist: '',
        album: '',
        merchant: '',
        yearReleased: '',
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showSpinner, setShowSpinner] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [errors, setErrors] = useState<string[]>([]);

    const validateForm = () => {
        const newErrors: string[] = [];
        if (!formData.artist.trim()) newErrors.push('Artist is required.');
        if (!formData.album.trim()) newErrors.push('Album is required.');
        // yearReleased validation might need to be revised
        if (!formData.yearReleased.trim()) {
            const year = parseInt(formData.yearReleased, 10);
            if (isNaN(year) || year <1000 || year > 9999) {
                newErrors.push('Year Released must be a valid 4-digit number.');
            }
        }
        setErrors(newErrors);
        return newErrors.length === 0;
    };

    const submitRecord = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validateForm()) return;

        setIsSubmitting(true);
        setShowSpinner(true);
        setSuccessMessage('');
        setErrors([]);

        try {
            const res = await fetch('api/records', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if(res.ok) {
                setTimeout(() => {
                    setShowSpinner(false);
                    setSuccessMessage('🎉 Record added successfully!');
                    setFormData({ artist: '', album: '', merchant: '', yearReleased: '' });
                }, 3000);
            } else {
                setShowSpinner(false);
                setErrors(['Something went wrong while adding the record.']);
            }
        } catch (err) {
            setShowSpinner(false);
            setErrors(['Server error. Please try again later.']);
        } finally {
            setTimeout(() => setIsSubmitting(false), 3000);
        }
    };

    return (
        <div className='modal-overlay' onClick={closeModal}>
            <div className='modal-content' onClick={(e) => e.stopPropagation()}>
                <h1>Add a New Record</h1>

                <form onSubmit={submitRecord} className='modal-form'>
                    <input
                      className='modal-input'
                      placeholder='Artist'
                      value={formData.artist}
                      onChange={(e) => setFormData({ ...formData, artist: e.target.value })}
                      />
                    <input
                      className='modal-input'
                      placeholder='Album'
                      value={formData.album}
                      onChange={(e) => setFormData({ ...formData, album: e.target.value })}
                      />
                    <input
                      className='modal-input'
                      placeholder='Merchant'
                      value={formData.merchant}
                      onChange={(e) => setFormData({ ...formData, merchant: e.target.value })}
                      />
                    <input
                      className='modal-input'
                      placeholder='Year Released'
                      value={formData.yearReleased}
                      onChange={(e) => setFormData({ ...formData, yearReleased: e.target.value })}
                      />
                      <button type='submit' disabled={isSubmitting} className='modal-btn'>
                        {isSubmitting ? 'Submitting...' : 'Submit'}
                      </button>
                </form>

                {showSpinner && <div className='spinner'>⏳</div>}
                {successMessage && <div className='success-message'>{successMessage}</div>}

                {errors.length > 0 && (
                    <div className='error-messages'>
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