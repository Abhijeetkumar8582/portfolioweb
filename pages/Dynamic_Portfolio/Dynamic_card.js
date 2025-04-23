import React from 'react'
import Style from "../../styles/Dynamic.module.css";

export function DynamicCard() {
  return (
    <div>
      <div className={Style.Dynamic_Card_one} draggable="true">
        <h3>{item.Project_Name}</h3>
        <p>{item.Project_Description}</p>
      </div>
    </div>
  )
}

export function ExpirenceCard() {
  return (
    <div>
      <div className={Style.Expirence_Card}>
        <div className={Style.Expirence_icon}>
        </div>
        <div className={Style.Expirence_content}>
          <span className={Style.Expirence_title}>Good news Mac users!</span>
          <div className={Style.Expirence_desc}>This software is now available for download.</div>
          <div className={Style.Expirence_actions}>
          </div>
        </div>
      </div>
    </div>
  )
}

export function Skillcard(item) {
  return (
    <div className={Style.Skill_Div}>
      <div className={Style.Skill_Div_One}>
        <h1>{item.skills}</h1>
        <img src={item.logo} alt="Skill_Image" width="20px" height="20px" />
      </div>
    </div>
  )
}

export function Licensecard() {
  return (
    <div className={Style.Timeline_Div}>
      <div className={Style.Timeline_Div_One}>
        <ExpirenceCard />
      </div>
    </div>)
}

