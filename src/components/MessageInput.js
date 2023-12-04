// src/components/MessageInput.js
import React, { useState } from 'react';
import Recordbutton from './Recordbutton.js';
import './css/MessageInput.css'; // Make sure to have a corresponding CSS file

function MessageInput({ onSendMessage, onSendImage, onSendAudio, onSendVideo}) {
    const [message, setMessage] = useState('');
    const [selectedImage, setSelectedImage] = useState(null);
    const [showExtraIcons, setShowExtraIcons] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();
        if (message) {
            onSendMessage(message);
            setMessage('');
        }
        if (selectedImage) {
            onSendImage(selectedImage);
            setSelectedImage(null);
        }
    };

    const handleMediaChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            if (file.type.startsWith('image/')) {
                onSendImage(file);  // 假设 onSendImage 函数处理文件上传的逻辑
            } else if (file.type.startsWith('video/')) {
                onSendVideo(file);  // 假设 onSendVideo 函数处理文件上传的逻辑
            }
        }
    };
    

    return (
        <div className={`message-input-bar ${showExtraIcons ? 'show-extra-icons' : ''}`}>
            <Recordbutton onSendAudio={onSendAudio}/>
            <form onSubmit={handleSubmit} className="message-form">
                <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type a message..."
                    className="text-input"
                />
                {/* <button type="submit" className="send-button">Send</button> */}
            </form>
            <div className="extra-icons-panel">
                <div>
                <div className="icon image-upload">
                    {/* 使用 "照片" 标签，并关联到隐藏的文件输入 */}
                    <label htmlFor="image-upload" className="image-upload-label">照片</label>
                    <input
                        id="image-upload"
                        type="file"
                        onChange={handleMediaChange}
                        accept="image/*,video/*"
                        style={{ display: 'none' }} // 隐藏文件输入
                    />
                </div>
                    <div className="icon"></div>
                </div>
                <div>
                    <div className="icon">文件</div>
                    <div className="icon"></div>
                </div>
                <div>
                    <div className="icon"></div>
                    <div className="icon"></div>
                </div>
                <div>
                   
                    <div className="icon"></div>
                    <div className="icon"></div>
                </div>
                
            </div>
        
        <button className="toggle-button" onClick={() => setShowExtraIcons(!showExtraIcons)}>
                    {showExtraIcons ? 'Close' : 'Plus'}
                </button>
        </div>
    );
}

export default MessageInput;
