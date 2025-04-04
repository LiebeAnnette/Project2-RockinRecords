import React, { useState } from 'react';

const AddRecordPage = () => {
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
    if (formData.yearReleased) {
      const year = parseInt(formData.yearReleased);
      if (isNaN(year) || year < 1000 || year > 9999) {
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
      const res = await fetch('/api/records', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        // Simulate processing time with spinner for 3 seconds
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
      setTimeout(() => setIsSubmitting(false), 3000); // wait until spinner ends
    }
  };

  const backgroundStyle = {
    backgroundImage: `url('/assets/images/redrecord.jpg')`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundAttachment: 'fixed',
    backgroundRepeat: 'no-repeat',
    minHeight: '100vh',
    width: '100%',
    padding: '2rem',
    color: 'black',
    display: 'flex',
    flexDirection: 'column' as const,
  };

  const inputStyle = {
    marginBottom: '1rem',
    padding: '0.5rem',
    width: '300px',
    maxWidth: '100%',
    borderRadius: '4px',
    border: '1px solid #ccc',
  };

  const formStyle = {
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'flex-start',
  };

  const messageStyle = {
    marginTop: '1rem',
    padding: '0.5rem 1rem',
    backgroundColor: '#d4edda',
    border: '1px black',
    color: '#155724',
    borderRadius: '4px',
  };

  const errorStyle = {
    marginTop: '0.5rem',
    color: 'red',
    fontSize: '0.9rem',
  };

  const spinnerStyle = {
    width: '120px',
    height: '120px',
    margin: '2rem auto',
    animation: 'spin 2s linear infinite',
  };

  return (
    <div style={backgroundStyle}>
      <h1>Add a New Record</h1>

      <form onSubmit={submitRecord} style={formStyle}>
        <input
          style={inputStyle}
          placeholder="Artist"
          value={formData.artist}
          onChange={(e) => setFormData({ ...formData, artist: e.target.value })}
        />
        <input
          style={inputStyle}
          placeholder="Album"
          value={formData.album}
          onChange={(e) => setFormData({ ...formData, album: e.target.value })}
        />
        <input
          style={inputStyle}
          placeholder="Merchant"
          value={formData.merchant}
          onChange={(e) => setFormData({ ...formData, merchant: e.target.value })}
        />
        <input
          style={inputStyle}
          placeholder="Year Released"
          value={formData.yearReleased}
          onChange={(e) => setFormData({ ...formData, yearReleased: e.target.value })}
        />
        <button type="submit" disabled={isSubmitting} style={{ ...inputStyle, cursor: 'pointer' }}>
          {isSubmitting ? 'Submitting...' : 'Submit'}
        </button>
      </form>

      {showSpinner && (
        <img
          src="/assets/images/spinning record.jpg"
          alt="Spinning record"
          style={spinnerStyle}
        />
      )}

      {successMessage && <div style={messageStyle}>{successMessage}</div>}

      {errors.length > 0 && (
        <div style={errorStyle}>
          {errors.map((error, index) => (
            <div key={index}>• {error}</div>
          ))}
        </div>
      )}

      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default AddRecordPage;
