const HomePage = () => {
    const backgroundStyle = {
      backgroundImage: `url('/assets/images/redlabel.jpg')`,
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
        <h1>Welcome to Rockin' Records</h1>