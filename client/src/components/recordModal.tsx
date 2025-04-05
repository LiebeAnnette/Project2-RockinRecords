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
        const newErrors = [];
        if (!formData.artist.trim()) newErrors.push('Artist is required.');
        if (!formData.album.trim()) newErrors.push('Album is required.');
        if(formData.yearReleased) {
            const year = parseInt(formData.yearReleased);
            if (isNaN(year) || year < 1000 || year > 9999) {
                newErrors.push('Year Released must be a valid 4-digit number.');
            }
        }
        setErrors(newErrors);
        return newErrors.length === 0;
    };

    // WIP: work in progress...
};

export default RecordModal;