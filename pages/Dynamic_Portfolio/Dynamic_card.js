import React from 'react'
import Style from "/styles/Dynamic.module.css";

export default function DynamicCard() {
  return (
    <div>
      <div className={Style.Dynamic_Card_one}>
        <h3>Project 1</h3>
        <p>Description of Project 1</p>
      </div>
    </div>
  )
}