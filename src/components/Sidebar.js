import React from 'react'
import SidebarOption from './SidebarOption';

const Sidebar = () => {
    return (
        <div className="status_bar shadow">
             
             <h3 className='m-3 text-white'>Status Bar</h3>
             <SidebarOption icon={"Icon"} title={"Account"}/>
             <SidebarOption icon={"Icon"} title={"subha"}/>
             <SidebarOption icon={"Icon"} title={"Dream Girl"}/>
             <SidebarOption icon={"Icon"} title={"Anu"}/>

            
        </div>
    )
}

export default Sidebar;
