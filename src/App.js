// src/App.js
import React, { useState, useEffect } from 'react';
import ChatList from './components/ChatList';
import MessageInput from './components/MessageInput';
import { uploadImageToServer, uploadAudioToServer, uploadVideoToServer} from './components/apiService/apiService';
import './App.css';

const route = 'http://localhost:5001';

function App() {
    const [messages, setMessages] = useState([]);

    // 加载消息的函数
    const loadMessages = async () => {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/messages`);
        const data = await response.json();
        console.log("Loaded messages:", data);
        setMessages(data);
    };

    // 发送消息到服务器的函数
    const sendMessageToServer = async (newMessage) => {
        const messageObject = {
            type: 'text', // 指定消息类型
            content: newMessage
        };
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/messages`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(messageObject)
        });
        const data = await response.json();
        console.log("Sent message:", data);
        setMessages([...messages, data]);
    };

    const deleteMessage = async (messageId) => {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/messages/${messageId}`, {
                method: 'DELETE'
            });
            if (response.ok) {
                setMessages(messages.filter(message => message._id !== messageId));
            } else {
                console.error('Failed to delete the message');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };
    
    // 使用useEffect钩子在组件加载时加载消息
    useEffect(() => {
        loadMessages();
    }, []);
    
    const updateMessages = (newMessage) => {
        setMessages([...messages, newMessage]);
    };

    const uploadImage = (file) => {
        uploadImageToServer(file, updateMessages).catch(console.error);
    };

    const uploadAudio = (file) => {
        uploadAudioToServer(file, updateMessages).catch(console.error);
    };

    const uploadVideo = (file) => {
        uploadVideoToServer(file, updateMessages).catch(console.error);
    };

    return (
        <div className="app">
            <h3>Barry</h3>
            <ChatList messages={messages} onDeleteMessage={deleteMessage} />
            <MessageInput 
                onSendMessage={sendMessageToServer} 
                onSendImage={uploadImage} 
                onSendAudio={uploadAudio}
                onSendVideo={uploadVideo}
            />
        </div>
    );
}

export default App;
