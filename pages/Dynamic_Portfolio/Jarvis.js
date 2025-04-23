import React, { useEffect, useRef, useState } from 'react';
import Style from '../../styles/Dynamic.module.css';
import AboutmeSkills from "../Json/AboutmeSkills.json";
import AboutmeLicenses from "../Json/AboutmeLicenses.json";
import AboutmeProject from "../Json/Projects.json";
import AboutmeExpirence from "../Json/Expirence.json";
import { DynamicCard, ExpirenceCard, Skillcard, Licensecard } from './Dynamic_card';

const Jarvis = () => {
  const jarvisRef = useRef(null);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [cardData, setCardData] = useState([]);
  const [sdata, setdata] = useState("");
useEffect(()=>{
  console.log("cardData", cardData);
},[cardData]);
  // Voice speech
  const speak = (text) => {
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);

      utterance.onstart = () => {
        setIsSpeaking(true);
        jarvisRef.current?.classList.add(Style.speaking);
      };

      utterance.onend = () => {
        setIsSpeaking(false);
        jarvisRef.current?.classList.remove(Style.speaking);
      };

      utterance.onerror = () => {
        setIsSpeaking(false);
        jarvisRef.current?.classList.remove(Style.speaking);
      };

      window.speechSynthesis.speak(utterance);
    } else {
      console.error('Speech synthesis not supported');
    }
  };

  // Event listener for external calls
  useEffect(() => {
    const handleSpeakEvent = (event) => {
      if (event.detail?.text) {
        callOpenAI(event.detail.text);
        setCardData([]);
        setdata("");
      }
    };

    document.addEventListener('jarvisSpeak', handleSpeakEvent);

    setTimeout(() => {
      speak('Jarvis is ready');
    }, 1000);

    return () => {
      document.removeEventListener('jarvisSpeak', handleSpeakEvent);
    };
  }, []);


  // JSON selector logic
  const get_datafunction = async (question, jsonName) => {
    let json_data = "";
    let json_format = {};
    console.log("jsonName", question,jsonName);
    switch (jsonName) {
      case "Skills":
        json_data = AboutmeSkills;
        json_format = [
            {
              "Skill_Name": "Skill_Name",
              "Skill_Description": "Skill_Description",
              "Skill_Icon": "Skill_Icon",
              "Skill_Link": "Skill_Link"
            }
          ]
        ;
        break;
      case "Licenses":
        json_data = AboutmeLicenses;
        json_format = [
            {
              "License_Name": "License_Name",
              "License_Description": "License_Description",
              "License_Icon": "License_Icon",
              "License_Link": "License_Link"
            }
          ]
        ;
        break;
      case "Projects":
        json_data = AboutmeProject;
        json_format = [
            {
              "Project_Name": "Project_Name",
              "Project_Description": "Project_Description",
              "Project_Icon": "Project_Icon",
              "Project_Link": "Project_Link"
            }
          ]
        ;
        break;
      case "Experience":
        json_data = AboutmeExpirence;
        json_format = [
            {
              "Experience_Name": "Experience_Name",
              "Experience_Description": "Experience_Description",
              "Experience_Icon": "Experience_Icon",
              "Experience_Link": "Experience_Link"
            }
          ]
        ;
        break;
      default:
        throw new Error("Invalid JSON name");
    }
    console.log("json_format", json_format, json_data);

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: ""
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: `You are an intelligent . Use the provided JSON data to answer the user's question accurately. Only return relevant  values from the dataset:\n\n${JSON.stringify(json_data)}. You should 
            return the response in JSON format. Format is like {"SummaryText":"It should be a short story about me",cardType:"Selecte one text[AboutmeSkills,AboutmeLicenses,AboutmeProject,AboutmeExpirence]",cardData:${json_format}} dont change the format of cardData`
          },
          {
            role: "user",
            content: question
          }
        ],
        temperature: 0.3,
        max_tokens: 1000
      })
    });

    const result = await response.json();
    console.log("json_format2", json_format, json_data);
  
    // Process the card data
    
    
    // const cardDataResult = await cardDataResponse.json();
    // console.log("json", cardDataResult.choices[0].message.content, typeof(cardDataResult.choices[0].message.content));
    
    try {
      console.log("result", result.choices[0].message.content);
      const message = result.choices[0].message.content;
  const jsonStartIndex = message.indexOf("{");
  const jsonEndIndex = message.lastIndexOf("}") + 1;
  const jsonMessage = message.slice(jsonStartIndex, jsonEndIndex).trim();
      return jsonMessage;
    } catch (error) {
      console.error("Error parsing card data:", error);
      return jsonMessage;
    }
  };

  // Main logic handler
  const callOpenAI = async (question) => {
    const tools = [
      {
        type: "function",
        function: {
          name: "get_datafunction",
          description: "Detect the relevant JSON category (Skills, Licenses, Projects, or Experience) based on the user question about Abhijeet Kumar.",
          parameters: {
            type: "object",
            properties: {
              question: { type: "string" },
              jsonName: { type: "string" }
            },
            required: ["question", "jsonName"],
            additionalProperties: false
          },
          strict: true
        }
      }
    ];

    try {
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: ""
        },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          messages: [
            {
              role: "system",
              content: `You are an AI assistant for Abhijeet Kumar. Present yourself as him when replying to users.

If a user asks a question about Abhijeet's profile, skills, certifications, projects, or work experience:

1. First call the function \`get_datafunction\` with the question to detect which JSON dataset to use.
2. Then use the result as a dynamic response for display.
Only return the relevant structured data.`
            },
            {
              role: "user",
              content: question
            }
          ],
          tools: tools,
          tool_choice: "auto"
        })
      });

      const result = await response.json();

      if (result.choices && result.choices.length > 0) {
        const message = result.choices[0].message;

        if (message.tool_calls?.length > 0) {
          let responseContent = "";

          for (const toolCall of message.tool_calls) {
            if (toolCall.function?.name === "get_datafunction") {
              const args = JSON.parse(toolCall.function.arguments);
              const dataResponse = await get_datafunction(args.question, args.jsonName);
              responseContent = dataResponse;
            }
          }

          if (responseContent) {
            try {
             
            } catch (e) {
            }

            const parsedCardData = JSON.parse(responseContent);
            console.log("parsedCardData", parsedCardData, typeof(parsedCardData));
            
            // Update the state with the parsed data
            speak(parsedCardData.SummaryText);
            setCardData(parsedCardData.cardData);
            setdata(parsedCardData.cardType);
            console.log("responseContent", responseContent);
            return responseContent;
          }
        }

        if (message.content) {
          speak(message.content);
          return message.content;
        }
      }

      speak("Sorry, I couldn't find an answer.");
      return null;
    } catch (error) {
      console.error("OpenAI call failed:", error);
      speak("An error occurred while processing your request.");
      return null;
    }
  };

  return (
    <div>
      <div className={Style.Dynamic_Card_Jarvis_div}>
        <div className={Style.Dynamic_Card}>
        {sdata === "AboutmeProject" && cardData.map((item, index) => (
                 <div style={{display:"flex",flexDirection:"row",gap:"10px",alignItems:"center",justifyContent:"center",flexWrap:"wrap"}}>
                 <div className={Style.Dynamic_Card_one} draggable="true">
                 <img src={item.image} alt="Project_Image" width="100%" height="120px" />
                   <h5>{item.title}</h5>
                   <p style={{fontSize:"12px",color:"#808080"}}>{item.description}</p>
                   
                   <h6 style={{fontSize:"12px",color:"#808080"}}>{item.code}</h6>
                   <button onClick={() => window.open(item.button, '_blank')} style={{backgroundColor:"#000",color:"#fff",padding:"5px 10px",borderRadius:"5px",cursor:"pointer",fontSize:"12px"}}>View Project</button>
                 </div>
               </div>
              ))}
              {sdata === "AboutmeSkills" && cardData.map((item, index) => (
                <div className={Style.Skill_Div}>
                <div className={Style.Skill_Div_One}>
                <img src={item.logo} alt="Skill_Image" width="20px" height="20px" />
                  <h6>{item.skills}</h6>
                  {/* <img src={item.logo} alt="Skill_Image" width="20px" height="20px" /> */}
                </div>
              </div>
              ))}
              {sdata === "AboutmeLicenses" && cardData.map((item, index) => (
                  <div className={Style.Timeline_Div}>
                 <div className={Style.Timeline_Div_One}>
                 <div className={Style.Expirence_Card}>
        <div className={Style.Expirence_icon}>
          <img src={item.logo} alt="Expirence_Image" width="50px" height="50px" />
        </div>
        <div className={Style.Expirence_content}>
          <span className={Style.Expirence_title}>{item.tittle}</span>
          <div className={Style.Expirence_desc}>{item.description}</div>
          <div className={Style.Expirence_actions}>
            <img src={item.certificate} alt="Expirence_Image" width="20px" height="20px" />
          </div>
        </div>
      </div>
                 </div>
               </div>
              ))} 
              {sdata === "AboutmeExpirence" && cardData.map((item, index) => (
                <div className={Style.Expirence_Card}>
                <div className={Style.Expirence_icon}>
                  <img src={item.logo} alt="Expirence_Image" width="20px" height="20px" />
                </div>
                <div className={Style.Expirence_content}>
                  <span className={Style.Expirence_title}>{item.desginstion} - {item.jobtype}</span>
                  <div className={Style.Expirence_desc}>{item.jobRole}</div>
                  <div className={Style.Expirence_desc}>{item.timeline}</div>
                  <div className={Style.Expirence_actions}>
                  </div>
                </div>
              </div>
              ))}

        </div>
        <div className={Style.Jarvis_Div}>
          <div className={Style.jarvisContainer}>
            <div className={Style.jarvisCore} ref={jarvisRef} id="jarvis">
              <div className={Style.waveform}>
                <div className={Style.bar} style={{ animationDelay: '0s' }}></div>
                <div className={Style.bar} style={{ animationDelay: '0.1s' }}></div>
                <div className={Style.bar} style={{ animationDelay: '0.2s' }}></div>
                <div className={Style.bar} style={{ animationDelay: '0.3s' }}></div>
                <div className={Style.bar} style={{ animationDelay: '0.4s' }}></div>
                <div className={Style.bar} style={{ animationDelay: '0.5s' }}></div>
                <div className={Style.bar} style={{ animationDelay: '0.6s' }}></div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Jarvis;
