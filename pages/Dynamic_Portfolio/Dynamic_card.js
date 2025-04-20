import React from 'react'
import Style from "/styles/Dynamic.module.css";

export function DynamicCard() {
  return (
    <div>
      <div className={Style.Dynamic_Card_one} draggable="true">
        <h3>Project 1</h3>
        <p>Description of Project 1</p>
      </div>
    </div>
  )
}
export function ExpirenceCard(){
    return(
        <div>
           
<div className={Style.Expirence_Card}>
        <div className={Style.Expirence_icon}>
            {/* <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><g stroke-width="0" id="SVGRepo_bgCarrier"></g><g stroke-linejoin="round" stroke-linecap="round" id="SVGRepo_tracerCarrier"></g><g id="SVGRepo_iconCarrier"> <path stroke-linejoin="round" stroke-linecap="round" stroke-width="1.5" stroke="#ffffff" d="M20 14V17.5C20 20.5577 16 20.5 12 20.5C8 20.5 4 20.5577 4 17.5V14M12 15L12 3M12 15L8 11M12 15L16 11"></path> </g></svg> */}
        </div>
        <div className={Style.Expirence_content}>
            <span className={Style.Expirence_title}>Good news Mac users!</span>
            <div className={Style.Expirence_desc}>This software is now available for download.</div> 
            <div className={Style.Expirence_actions}>
                
            </div>    
        </div>
        {/* <button type="button" class="close">
            <svg aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
        </button> */}
</div>
        </div>
    )
}
