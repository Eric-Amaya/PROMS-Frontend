import React, { useState } from 'react';
import ChatButton from './ViewChat/ChatButton';
import ChatWindow from './ViewChat/ChatWindow';
import { Box } from '@mui/material';

const ProjectChat = () => {
    const [isChatOpen, setIsChatOpen] = useState(false);

    const participants = [
        { id: 1, name: 'Participant 1', info: 'Info about Participant 1' },
        { id: 2, name: 'Participant 2', info: 'Info about Participant 2' },
    ];

    const toggleChat = () => {
        setIsChatOpen(!isChatOpen);
    };

    return (
        <Box display={'flex'} justifyContent={'flex-end'}>
            <ChatButton newMessagesCount={2} onClick={toggleChat} />
            <ChatWindow
                open={isChatOpen}
                onClose={toggleChat}
                projectTitle="Project Title"
                participants={participants}
            />
        </Box>
    )
}

export default ProjectChat;