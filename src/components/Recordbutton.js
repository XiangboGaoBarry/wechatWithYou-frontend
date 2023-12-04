import React, { useState, useEffect } from 'react';

function Recordbutton({onSendAudio}) {

  const [isRecording, setIsRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [audioData, setAudioData] = useState(null);

  useEffect(() => {
    // 检查浏览器支持
    if (!navigator.mediaDevices || !window.MediaRecorder) {
      alert("Your browser does not support audio recording.");
      return;
    }

    // 请求录音权限
    navigator.mediaDevices.getUserMedia({ audio: true })
      .then(stream => {
        const recorder = new MediaRecorder(stream);
        setMediaRecorder(recorder);

        // 收集录音数据
        let chunks = [];
        recorder.ondataavailable = e => chunks.push(e.data);

        // 录音结束时的处理
        recorder.onstop = () => {
          const completeBlob = new Blob(chunks, { type: 'audio/mp4' });
          setAudioData(completeBlob);
          chunks = [];
        };
      })
      .catch(err => {
        console.error("Error accessing media devices.", err);
      });
  }, []);

  // 开始录音
  const startRecording = () => {
    if (mediaRecorder) {
      setIsRecording(true);
      mediaRecorder.start();
    }
  };

  // 停止录音
  const stopRecording = () => {
    if (mediaRecorder) {
      setIsRecording(false);
      mediaRecorder.stop();
    }
  };

  // 发送录音
  useEffect(() => {
    if (audioData && !isRecording) {
      onSendAudio(audioData);
      setAudioData(null);
    }
  }, [audioData, isRecording, onSendAudio]);


  return (
    <button
    className="voice-record-button"
    onMouseDown={startRecording}
    onMouseUp={stopRecording}
    onTouchStart={startRecording}
    onTouchEnd={stopRecording}
    >
    {isRecording ? 'Recording...' : 'Voice'}
    </button>
  );
}

export default Recordbutton;
