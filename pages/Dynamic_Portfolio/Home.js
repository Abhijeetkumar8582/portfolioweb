import React, { useState,useEffect } from 'react';
import Style from '../../styles/Dynamic.module.css';
import { DynamicCard,LoadingDivMainCard,SkillcardMainCard,ProjectCardMainCard,MainCard, ExpirenceCard,Skillcard,Licensecard } from './Dynamic_card';
import Jarvis from './Jarvis';
import AboutmeProject from "../Json/Projects.json";
import AboutmeExpirence from "../Json/Expirence.json";
import AboutmeSkills from "../Json/AboutmeSkills.json";
// import AgenticAgent from './AgenticAgent';

function Home() {
  const [inputText, setInputText] = useState('');
  const [responseData, setResponseData] = useState(null);

  // When text input changes
  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  useEffect(() => {
    // Listen for response data from Jarvis
    const handleResponse = (event) => {
      if (event.detail?.response) {
        setResponseData(event.detail.response);
      }
    };

    document.addEventListener('jarvisResponse', handleResponse);
    return () => {
      document.removeEventListener('jarvisResponse', handleResponse);
    };
  }, []);

  // When user sends message to Jarvis
  const handleSendToJarvis = () => {
    if (inputText.trim()) {
      console.log('Sending to Jarvis:', inputText);
      
      // Create and dispatch a custom event with the user's message
      const event = new CustomEvent('jarvisSpeak', {
        detail: { text: inputText }
      });
      document.dispatchEvent(event);
      
      // Clear the input field
      setInputText('');
    }
  };

  // Manual button to activate Jarvis
  const handleClick = () => {
    console.log('Skills button clicked');
    const event = new CustomEvent('jarvisSpeak', {
      detail: { text: "Hello, how can I assist you?" }
    });
    document.dispatchEvent(event);
  };

  return (
    <div className={Style.MainDiv_Header_One}>
      <div className={Style.MainDiv_Header_One_Div}>
        <div className={Style.MainDiv_Header_One_Left}>
          <div className={Style.Header_text_heading}>
            <h2 className={Style.Header_text_heading_text}>Hi, I'm</h2>
            <h2 className={Style.Header_text_heading_text}>Abhijeet Kumar</h2>
          </div>
          {/* <AgenticAgent/> */}
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
          <img src="/Image/Avatar.png" width={270} height={270} alt="Profile" />
          <div className={Style.MainDiv_Header_Two_Right}>
          <textarea 
            placeholder="How can I help you? Would you like to know more about me?" 
            className={Style.input} 
            name="text"
          ></textarea>
        </div>
        </div>
      </div>
      {/* <LoadingDivMainCard/> */}
      <Jarvis />

      {/* Response Display Area */}
      {responseData && (
        <div className={Style.responseContainer}>
          <div className={Style.responseText}>
            {responseData.SummaryText}
          </div>
          {responseData.cardData && responseData.cardData.length > 0 && (
            <div className={Style.cardContainer}>
              {responseData.cardType === 'AboutmeSkills' && (
                <Skillcard data={responseData.cardData} />
              )}
              {responseData.cardType === 'AboutmeLicenses' && (
                <Licensecard data={responseData.cardData} />
              )}
              {responseData.cardType === 'AboutmeProject' && (
                <DynamicCard data={responseData.cardData} />
              )}
              {responseData.cardType === 'AboutmeExpirence' && (
                <ExpirenceCard data={responseData.cardData} />
              )}
            </div>
          )}
        </div>
      )}

      {/* Optional input to speak custom text */}
      <div className={Style.TextDiv} style={{ marginTop: '20px' }}>
        <input
          type="text"
          className={Style.Input_Box}
          value={inputText}
          onChange={handleInputChange}
          placeholder="Type something for Jarvis..."
          // className={Style.Input_Box}
        />
        <button onClick={handleSendToJarvis} className={Style.text_input_btn}>
          Send to Jarvis
        </button>
      </div>

      
    </div>
  );
}

export default Home;
