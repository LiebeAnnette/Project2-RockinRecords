const AddRecordPage = () => {
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
      flexDirection: 'column',
    };
  
    return (
      <div style={backgroundStyle}>
        <h1>Add a New Record</h1>