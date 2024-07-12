import React, { useState, useEffect } from 'react';
import ChatButton from '../components/ViewProyect-Page/ViewChat/ChatButton';
import ChatWindow from '../components/ViewProyect-Page/ViewChat/ChatWindow';
import { Box } from '@mui/material';

const ViewChat = () => {
    const [isChatOpen, setIsChatOpen] = useState(false);
    const [messageCountWithOutRead, setMessageCountWithOutRead] = useState(0);

    const toggleChat = () => {
        setIsChatOpen(!isChatOpen);
        if (!isChatOpen) {
            setMessageCountWithOutRead(0); // Reinicia el contador al abrir el chat
        }
    };

    // useEffect(() => {
    //     // Simula la llegada de nuevos mensajes
    //     const interval = setInterval(() => {
    //         setMessageCountWithOutRead(prevCount => Math.min(prevCount + 1, 99));
    //     }, 5000); // Llega un nuevo mensaje cada 5 segundos

    //     return () => clearInterval(interval);
    // }, []);

    return (
        <Box>
            <ChatButton newMessagesCount={messageCountWithOutRead} onClick={toggleChat} />
            <ChatWindow
                open={isChatOpen}
                onClose={toggleChat}
                projectTitle="Titulo de proyecto"
                incrementUnreadCount={() => setMessageCountWithOutRead(prevCount => Math.min(prevCount + 1, 99))}
            />
        </Box>
    )
}

export default ViewChat;
