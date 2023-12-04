// src/components/ChatList.js
import React, { useState } from 'react';
import './css/ChatList.css'; // 引入CSS文件
const { format } = require('date-fns');

function ChatList({ messages, onDeleteMessage }) {
    const [selectedImage, setSelectedImage] = useState(null);
    const [showContextMenu, setShowContextMenu] = useState(false);
    const [contextMenuPosition, setContextMenuPosition] = useState({ x: 0, y: 0 });
    const [selectedMessageId, setSelectedMessageId] = useState(null);

    const handleRightClick = (event, messageId) => {
        event.preventDefault();
        setShowContextMenu(true);
        setContextMenuPosition({ x: event.pageX, y: event.pageY });
        setSelectedMessageId(messageId);
    };

    const handleDelete = () => {
        onDeleteMessage(selectedMessageId);
        setShowContextMenu(false);
    };

    const handleImageClick = (imageUrl) => {
        // 设置选中的图片，以便展示大图
        setSelectedImage(imageUrl);
    };

    const handleClosePreview = () => {
        setSelectedImage(null);
    };

    const displayMessage = (message) => {
        if (message.type === 'text') {
            return <span>{message.content}</span>;
        }
        else if (message.type === 'image') {
            return <img
                src={message.content}
                alt="Uploaded"
                onClick={() => handleImageClick(message.content)}
                className="image-thumbnail"
            />;
        }
        else if (message.type === 'audio') {
            return <audio
                src={message.content}
                controls
            />;
        }
        else if (message.type === 'video') {
            return <video
                src={message.content}
                controls
                className="image-thumbnail"
            />;
        }
        else {
            return <span>Unsupported message type.</span>;
        }
    }

    const displayTimestamp = (currTime) => {
        let curr=new Date(currTime);
        if (!timestamp) {
            timestamp=curr;
            return <span id="timestamp">{format(curr, 'yyyy-MM-dd HH:mm')}</span>;
        }
        if (curr-timestamp > 1.2e+6) { // 两条消息间隔超过20分钟
            timestamp=curr;
            return <span id="timestamp">{format(curr, 'yyyy-MM-dd HH:mm')}</span>;
        }
        return null;
    }

    const isOwnMessage = true;

    let timestamp = null;

    return (
        <div className="chat-list">
            {messages.map((message, index) => (
                <div>
                    <div class="timestamp-container">
                        {displayTimestamp(message.createdAt)}
                    </div>
                    <div 
                    key={index}
                    className={`message-wrapper ${isOwnMessage ? 'own' : 'received'}`} // message.isOwnMessage
                    onContextMenu={(e) => handleRightClick(e, message._id)}
                >
                    { !isOwnMessage && <img src='WechatIMG86.jpeg' alt="Avatar" className="avatar" //{message.avatar}
                    /> }
                    <div className={`message ${message.type === 'image' || message.type === 'video' ? 'image-message' : ''} ${isOwnMessage ? 'sent-message' : 'received-message'}`}>
                        {displayMessage(message)}
                    </div>
                    { isOwnMessage && <img src='WechatIMG86.jpeg' alt="Avatar" className="avatar" //{message.avatar}
                    /> }
                </div>
                </div>
                
            ))}
            {selectedImage && (
                <div className="image-preview" onClick={handleClosePreview}>
                    <img src={selectedImage} alt="Preview" className="image-large" />
                </div>
            )}
            {showContextMenu && (
                <ul
                    className="custom-context-menu"
                    style={{ top: contextMenuPosition.y, left: contextMenuPosition.x }}
                >
                    <li onClick={handleDelete}>删除</li>
                </ul>
            )}
        </div>
    );
}

export default ChatList;
