import React from 'react'
import Style from "/styles/Dynamic.module.css";
import {DynamicCard} from './Dynamic_card';
import {ExpirenceCard} from './Dynamic_card';
import Jarvis from './Jarvis';
function Home() {
    const handleClick = () => {
        // Jarvis.activate();
    }
  return (
    <div className={Style.MainDiv_Header_One}>
      <div className={Style.MainDiv_Header_One_Div}>
        <div className={Style.MainDiv_Header_One_Left}>
            <div className={Style.Header_text_heading}>
                <h2 className={Style.Header_text_heading_text}>Hi, I'm</h2>
                <h2 className={Style.Header_text_heading_text}>Abhijeet Kumar</h2>
            </div>
            <div className={Style.Header_text_subheading}>
                <h1 className={Style.Header_text_subheading_text}>AI Engineer</h1>
                <h1 className={Style.Header_text_subheading_text}>Chatbot Specialist</h1>
            </div>

            <div className={Style.Header_text_subheading_button}>
                <button className={Style.Header_button_one}>Explore Projects</button>
                <button className={Style.Header_button_one}>Download Resume</button>
            </div>
        </div>
      
      <div className={Style.MainDiv_Header_Two}>
        <img src="/Image/Avatar.png"  width={270} height={270} alt="Profile" />
        <div className={Style.MainDiv_Header_Two_Right}>
          <textarea 
            placeholder="How can I help you? Would you like to know more about me?" 
            className={Style.input} 
            name="text"
          ></textarea>
        </div>
      </div>
      </div>
      <div className={Style.Dynamic_Card_Jarvis_div}>
        <div className={Style.Dynamic_Card}>
          <DynamicCard/>
          <DynamicCard/>
          <DynamicCard/>
        </div>
        <div className={Style.Jarvis_Div}>
            <Jarvis/>
          </div>
      </div>
      

      <div className={Style.Timeline_Div}>
        <div className={Style.Timeline_Div_One}>
            <ExpirenceCard/>
        </div>
      </div>

      <div className={Style.Skill_Div}>
        <div className={Style.Skill_Div_One}>
           <button onClick={handleClick()} className={Style.Skill_Button} disabled>Skills</button>
        </div>
      </div>
    </div>
  )
}

export default Home
