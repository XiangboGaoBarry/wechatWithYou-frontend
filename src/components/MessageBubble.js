// src/components/MessageBubble.js
import React from 'react';

function MessageBubble({ text, isOwnMessage }) {
    return (
        <div className={`message-bubble ${isOwnMessage ? 'own-message' : ''}`}>
            {text}
        </div>
    );
}

export default MessageBubble;
