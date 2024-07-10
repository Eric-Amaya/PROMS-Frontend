import React from 'react';
import MenuProject from '../components/ViewProyect-Page/MenuProject';
import GanttChart from '../components/ViewSchedule-Page/GanttChart';

const ViewSchedule = () => {


    return (
        <div>
            <MenuProject projectName={"Project Name"}/>
            <GanttChart />
        </div>
    );

};

export default ViewSchedule;