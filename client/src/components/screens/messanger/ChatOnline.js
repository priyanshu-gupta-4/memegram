import React from 'react'
import './chatOnline.css'
export default function ChatOnline() {
  return (
    <div className='chatOnline'>
        <div className='chatOnlineFriend'>
            <div className='chatOnlineImgContainer'>
                <img className='chatOnlineImg' src=""/>
                <div className='chatOnlineBadge'></div>
            </div>
            <div className='chatOnlineName'>John Doe</div>
        </div>
    </div>
  )
}
