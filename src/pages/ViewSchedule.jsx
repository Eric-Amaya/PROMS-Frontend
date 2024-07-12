import React from 'react';
import MenuProject from '../components/ViewProyect-Page/MenuProject';
import GanttChart from '../components/ViewProyect-Page/ViewSchedule/GanttChart';
import ViewChat from './ViewChat';
import { Container } from '@mui/material';

const ViewSchedule = () => {


    return (
        <div>
            <MenuProject projectName={"Project Name"}/>
            <Container maxWidth="xl" sx={{p: 2}}>
                <GanttChart />
            </Container>    
            <ViewChat/>
        </div>
    );

};

export default ViewSchedule;