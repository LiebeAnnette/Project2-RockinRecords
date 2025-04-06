// WIP: WORK IN PROGRESS --- fischer 4/5/25 @ 8:05

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
    const [errors, setErrors] = useState<string[]>({});

    const validateForm = () => {
        const newErrors = [];
        if (! formData.artist.trim()) newErrors.push('Artist is required.');
        if (! formData.album.trim()) newErrors.push('Album is required.');
        if (! formData.yearReleased) {
            const year = parseInt(formData.yearReleased);
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

    // cont. with more code at later time -- fischer
}