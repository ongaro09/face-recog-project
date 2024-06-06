import React, { useEffect, useRef, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../index.css';
import './VerificationPage.css';

const VerificationPage = () => {
  const { username } = useParams();
  const navigate = useNavigate();
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [capturedImage, setCapturedImage] = useState(null);

  useEffect(() => {
    // Access the webcam
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.play();
        }
      });
    }
  }, []);

  const handleCapture = () => {
    if (videoRef.current && canvasRef.current) {
      const context = canvasRef.current.getContext('2d');
      canvasRef.current.width = videoRef.current.videoWidth;
      canvasRef.current.height = videoRef.current.videoHeight;
      context.drawImage(videoRef.current, 0, 0, videoRef.current.videoWidth, videoRef.current.videoHeight);
      const dataUrl = canvasRef.current.toDataURL('image/jpeg');
      setCapturedImage(dataUrl);
    }
  };

  const handleRetake = () => {
    setCapturedImage(null);
  };

  const handleVerify = async () => {
    if (!capturedImage) {
      console.error('No image captured');
      return;
    }

    const blob = await fetch(capturedImage).then(res => res.blob());
    const formData = new FormData();
    formData.append('image', blob, 'captured.jpg');

    try {
      const response = await fetch(`http://localhost:5000/verify/${username}`, {
        method: 'POST',
        body: formData
      });
      const data = await response.json();
      if (response.ok) {
        alert(data.message);
        navigate(`/dashboard/${username}`);
      } else {
        alert(`Verification failed: ${data.message}`);
        navigate('/login');
      }
    } catch (err) {
      console.error('Verification error:', err.message);
      alert(`Verification error: ${err.message}`);
    }
  };

  return (
    <div className="verification-page">
      <h1>Verify Your Identity, {username}</h1>
      <div>
        <video ref={videoRef} id="video" width="320" height="240" autoPlay></video>
        <button onClick={handleCapture}>Capture Image</button>
      </div>
      <canvas ref={canvasRef} style={{ display: 'none' }}></canvas>
      {capturedImage && (
        <>
          <img src={capturedImage} alt="Captured" />
          <button onClick={handleRetake}>Retake Image</button>
          <button onClick={handleVerify}>Verify</button>
        </>
      )}
    </div>
  );
};

export default VerificationPage;