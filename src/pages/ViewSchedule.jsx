import React from 'react';
import MenuProject from '../components/ViewProyect-Page/MenuProject';
import GanttChart from '../components/ViewSchedule-Page/GanttChart';
import ViewChat from './ViewChat';

const ViewSchedule = () => {


    return (
        <div>
            <MenuProject projectName={"Project Name"}/>
            <GanttChart />
            <ViewChat/>
        </div>
    );

};

export default ViewSchedule;