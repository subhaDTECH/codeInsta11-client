import React from 'react'

const SidebarOption = ({icon,title}) => {
    return (
        <div className='ml-2 each_status  p-2 text-center'>
            <div>
                <img className="img-fluid   status_img" src="https://cdn.pixabay.com/photo/2017/02/05/17/40/saint-peters-basilica-2040718__340.jpg" alt="" />
            </div>
              <p>{title}</p>
            
        </div>
    )
}

export default SidebarOption
