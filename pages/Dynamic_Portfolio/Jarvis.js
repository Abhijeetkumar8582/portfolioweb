import React, { useEffect, useRef, useState } from 'react';
import styles from '../../styles/Dynamic.module.css';

const Jarvis = () => {
  const jarvisRef = useRef(null);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [speechSupported, setSpeechSupported] = useState(false);

  // Check if speech synthesis is supported
  useEffect(() => {
    if ('speechSynthesis' in window) {
      setSpeechSupported(true);
    }
  }, []);

  const speak = (text) => {
    if (!speechSupported) return;
    
    // Cancel any ongoing speech
    speechSynthesis.cancel();
    
    const utterance = new SpeechSynthesisUtterance(text);
    
    // Set up event handlers
    utterance.onstart = () => {
      setIsSpeaking(true);
      if (jarvisRef.current) {
        jarvisRef.current.classList.add(styles.speaking);
      }
    };
    
    utterance.onend = () => {
      setIsSpeaking(false);
      if (jarvisRef.current) {
        jarvisRef.current.classList.remove(styles.speaking);
      }
    };
    
    utterance.onerror = (event) => {
      console.error('Speech synthesis error:', event);
      setIsSpeaking(false);
      if (jarvisRef.current) {
        jarvisRef.current.classList.remove(styles.speaking);
      }
    };
    
    // Try to speak
    try {
      speechSynthesis.speak(utterance);
    } catch (error) {
      console.error('Error starting speech:', error);
    }
  };

  // Listen for custom events from outside the component
  useEffect(() => {
    // Function to handle custom speak events
    const handleSpeakEvent = (event) => {
      if (event.detail && event.detail.text) {
        speak(event.detail.text);
      } else {
        speak("Hello Abhijeet. Jarvis system is now active.");
      }
    };

    // Add event listener for custom speak event
    document.addEventListener('jarvisSpeak', handleSpeakEvent);
    
    // Clean up event listener
    return () => {
      document.removeEventListener('jarvisSpeak', handleSpeakEvent);
    };
  }, []);

  // Try to speak automatically on mount
  useEffect(() => {
    // Try to speak immediately
    speak("Hello Abhijeet. Jarvis system is now active.");
    
    // Also set up a timeout to try again after a short delay
    // This sometimes helps with browser initialization
    const timeoutId = setTimeout(() => {
      if (!isSpeaking) {
        speak("Hello Abhijeet. Jarvis system is now active.");
      }
    }, 1000);
    
    return () => clearTimeout(timeoutId);
  }, [speechSupported]); // Only run when speech support is determined

  // Add event listeners for various events to trigger speech
  useEffect(() => {
    // Function to handle visibility change
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        speak("Welcome back. Jarvis is still active.");
      }
    };

    // Function to handle focus events
    const handleFocus = () => {
      if (!isSpeaking) {
        speak("Jarvis is focused and ready.");
      }
    };

    // Add event listeners
    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('focus', handleFocus);
    
    // Clean up event listeners
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('focus', handleFocus);
    };
  }, [isSpeaking]);

  return (
    <div className={styles.jarvisContainer}>
      <div className={styles.jarvisCore} ref={jarvisRef} id="jarvis">
        <div className={styles.waveform}>
          <div className={styles.bar} style={{ animationDelay: '0s' }}></div>
          <div className={styles.bar} style={{ animationDelay: '0.1s' }}></div>
          <div className={styles.bar} style={{ animationDelay: '0.2s' }}></div>
          <div className={styles.bar} style={{ animationDelay: '0.3s' }}></div>
          <div className={styles.bar} style={{ animationDelay: '0.4s' }}></div>
          <div className={styles.bar} style={{ animationDelay: '0.5s' }}></div>
          <div className={styles.bar} style={{ animationDelay: '0.6s' }}></div>
        </div>
      </div>
    </div>
  );
};

export default Jarvis;
