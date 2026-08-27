'use client';

import { useState, useEffect, useRef, useCallback } from 'react';

export function useVoiceAssistant() {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [audioMuted, setAudioMuted] = useState(false);
  const [speechSupported, setSpeechSupported] = useState(false);
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (SpeechRecognition) {
        setSpeechSupported(true);
        const recognition = new SpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = true;
        recognition.lang = 'en-US';

        recognition.onresult = (event: any) => {
          let currentTranscript = '';
          for (let i = event.resultIndex; i < event.results.length; i++) {
            currentTranscript += event.results[i][0].transcript;
          }
          setTranscript(currentTranscript);
        };

        recognition.onend = () => {
          setIsListening(false);
        };

        recognition.onerror = (err: any) => {
          console.warn('Speech recognition error:', err);
          setIsListening(false);
        };

        recognitionRef.current = recognition;
      }
    }
  }, []);

  const startListening = useCallback(() => {
    if (recognitionRef.current) {
      try {
        setTranscript('');
        setIsListening(true);
        recognitionRef.current.start();
      } catch (err) {
        console.warn('Error starting speech recognition:', err);
        setIsListening(false);
      }
    } else {
      alert('Speech recognition is not supported in your browser. You can type your query below!');
    }
  }, []);

  const stopListening = useCallback(() => {
    if (recognitionRef.current && isListening) {
      try {
        recognitionRef.current.stop();
      } catch (err) {
        console.warn('Error stopping speech recognition:', err);
      }
      setIsListening(false);
    }
  }, [isListening]);

  const speakText = useCallback((text: string) => {
    if (audioMuted) return;
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      // Clean markdown formatting before speaking
      const cleanText = text
        .replace(/\*\*(.*?)\*\*/g, '$1')
        .replace(/`([^`]+)`/g, '$1')
        .replace(/#+\s/g, '')
        .replace(/⚡|🛠️|💼|🔒|🤖|✨|📊|🧠/g, '');

      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(cleanText);
      utterance.rate = 1.0;
      utterance.pitch = 1.0;

      // Select a clear voice if available
      const voices = window.speechSynthesis.getVoices();
      const naturalVoice = voices.find(v => v.lang.startsWith('en') && (v.name.includes('Natural') || v.name.includes('Google') || v.name.includes('Samantha')));
      if (naturalVoice) utterance.voice = naturalVoice;

      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);

      window.speechSynthesis.speak(utterance);
    }
  }, [audioMuted]);

  const stopSpeaking = useCallback(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  }, []);

  const toggleMute = useCallback(() => {
    setAudioMuted(prev => {
      if (!prev) stopSpeaking();
      return !prev;
    });
  }, [stopSpeaking]);

  return {
    isListening,
    transcript,
    setTranscript,
    isSpeaking,
    audioMuted,
    speechSupported,
    startListening,
    stopListening,
    speakText,
    stopSpeaking,
    toggleMute
  };
}
