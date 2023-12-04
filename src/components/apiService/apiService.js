// const route = 'http://localhost:5001';

async function uploadImageToServer(file, updateMessages) {
  const formData = new FormData();
  formData.append('file', file);

  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/messages/upload`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    // 解析JSON响应体，获取数据
    const data = await response.json();

    updateMessages(data); // 这里使用从响应中获取的公共URL
    return data;
  } catch (error) {
    console.error('Failed to upload image:', error);
  }
}

async function uploadAudioToServer(audioBlob, updateMessages) {
  const formData = new FormData();
  formData.append('audio', audioBlob, 'audio-message.mp3'); // 可以根据实际音频格式设置文件扩展名

  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/messages/audio`, {
      method: 'POST',
      body: formData,
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    // 解析JSON响应体，获取数据
    const data = await response.json();

    updateMessages(data); // 这里使用从响应中获取的数据，可能包括公共URL
    return data; // 可以选择返回数据以便进一步处理
  } catch (error) {
    console.error('Failed to upload audio:', error);
  }
}

async function uploadVideoToServer(videoFile, updateMessages) {
  const formData = new FormData();
  formData.append('video', videoFile, 'video-message.mp4'); // 根据实际视频格式设置文件扩展名

  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/messages/video`, {
      method: 'POST',
      body: formData,
    });
    
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    // 解析JSON响应体，获取数据
    const data = await response.json();

    updateMessages(data); // 使用从响应中获取的数据，可能包括公共URL
    return data; // 可选：返回数据以便进一步处理
  } catch (error) {
    console.error('Failed to upload video:', error);
  }
}


export {uploadImageToServer, uploadAudioToServer, uploadVideoToServer};


