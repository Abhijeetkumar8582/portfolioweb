import React, { useEffect, useRef, useState } from 'react';
import Style from '../../styles/Dynamic.module.css';
import AboutmeSkills from "../Json/AboutmeSkills.json";
import AboutmeLicenses from "../Json/AboutmeLicenses.json";
import AboutmeProject from "../Json/Projects.json";
import AboutmeExpirence from "../Json/Expirence.json";
import { DynamicCard,LoadingDivMainCard,SkillcardMainCard,ProjectCardMainCard,MainCard, ExpirenceCard,Skillcard,Licensecard } from './Dynamic_card';

const Jarvis = () => {
  const jarvisRef = useRef(null);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const[isLoading,setIsLoading] = useState(false);
  const [textData, setTextData] = useState("");
  const [maindiv,setMaindiv] = useState(true);
  const [cardData, setCardData] = useState([]);
  const [sdata, setdata] = useState("");
  const [loadingText, setLoadingText] = useState("");

  const speak = (text) => {
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);

      utterance.onstart = () => {
        setIsSpeaking(true);
        setMaindiv(false);
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
  const funnyLoadingTexts = [
    "🧠 Please wait… I need to resharpen my memory!",
    "🤖 Just teaching my circuits how to multitask… almost done!",
    "🕵️‍♂️ Digging through the archives like a digital detective…",
    "🥲 Loading… because even AI needs a coffee break sometimes!",
    "💡 Thinking really hard… sparks may fly!",
    "📚 Flipping through my imaginary notebook…",
    "🐢 I'm not slow, I'm just dramatically loading.",
    "⚙️ Calibrating intelligence... it’s a delicate art!",
    "⏳ Almost there... just arguing with my inner thoughts!",
    "🛠️ Assembling thoughts with love and a few bugs!"
  ];
  useEffect(() => {
    const handleSpeakEvent = (event) => {
      if (event.detail?.text) {
        setIsLoading(true);
        setLoadingText(funnyLoadingTexts[Math.floor(Math.random() * funnyLoadingTexts.length)]);
        callOpenAI(event.detail.text);
        setCardData([]);
        setdata("");
      }
    };

    document.addEventListener('jarvisSpeak', handleSpeakEvent);

    return () => {
      document.removeEventListener('jarvisSpeak', handleSpeakEvent);
    };
  }, [cardData]);


  
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
            return the response in JSON format. Format is like {"SummaryText":"It should be a short story about me",cardType:"Selecte one text[AboutmeSkills,AboutmeLicenses,AboutmeProject,AboutmeExpirence]",cardData:${json_format}} dont change the format of cardData and cardData should be array of object`
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
              const parsedCardData = JSON.parse(responseContent);
              console.log("parsedCardData", parsedCardData, typeof(parsedCardData));
              
              // Update the state with the parsed data
              setTextData(parsedCardData.SummaryText);
              speak(parsedCardData.SummaryText);
              setCardData(parsedCardData.cardData);
              setdata(parsedCardData.cardType);
              setIsLoading(false);
              console.log("responseContent", responseContent);
              return responseContent;
            } catch (e) {
              console.error("Error parsing response:", e);
              setIsLoading(false);
              return null;
            }
          }
        }

        if (message.content) {
          speak(message.content);
          setIsLoading(false);
          return message.content;
        }
      }

      speak("Sorry, I couldn't find an answer.");
      setIsLoading(false);
      return null;
    } catch (error) {
      console.error("OpenAI call failed:", error);
      speak("An error occurred while processing your request.");
      setIsLoading(false);
      return null;
    }
  };

  return (
    <div>
      <div className={Style.Dynamic_Card_Jarvis_div}>
      {
  maindiv
    ? (
      <div className={Style.Dynamic_Card}>
        {isLoading ? (
          <div>
          <div>
          <h6 style={{ fontSize: "16px", color: "grey" }}>{loadingText}</h6>
        </div>
          <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
          {Array(3).fill().map((_, index) => (
            <LoadingDivMainCard key={index} />
          ))}
        </div>
          </div>
        ) : (
      <div className={Style.parent_main_div}>
        <div className={Style.child_div_one}>
          {AboutmeExpirence.slice(0, 1).map((item, index) => (
            <MainCard item={item} key={index} style={{ width: "600px" }} />
          ))}
        </div>
        <div style={{ display: "flex", flexDirection: "row", gap: "20px" }}>
          <div className={Style.child_div_two}>
            {AboutmeProject.slice(0, 2).map((item, index) => (
              <ProjectCardMainCard item={item} key={index} />
            ))}
          </div>
          <div className={Style.child_div_three}>
            {AboutmeSkills.map((item, index) => (
              <SkillcardMainCard item={item} key={index} />
            ))}
          </div>
        </div>
      </div>)}
      </div>
    )
    : (
      <div className={Style.Dynamic_Card}>
        {isLoading ? (
          <div>
          <div>
          <h6 style={{ fontSize: "16px", color: "grey" }}>{loadingText}</h6>
        </div>
          <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
          {Array(3).fill().map((_, index) => (
            <LoadingDivMainCard key={index} />
          ))}
        </div>
          </div>
        ) : (
          <div>
            <div>
              <h6 style={{ fontSize: "16px", color: "grey" }}>{textData}</h6>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                gap: "20px",
                flexWrap: "wrap",
                maxHeight: "400px",
                overflowY: "scroll",
              }}
            >
              {sdata === "AboutmeProject" &&
                cardData.map((item, index) => (
                  <DynamicCard item={item} key={index} />
                ))}
              {sdata === "AboutmeSkills" &&
                cardData.map((item, index) => (
                  <Skillcard item={item} key={index} />
                ))}
              {sdata === "AboutmeLicenses" &&
                cardData.map((item, index) => (
                  <Licensecard item={item} key={index} />
                ))}
              {sdata === "AboutmeExpirence" &&
                cardData.map((item, index) => (
                  <ExpirenceCard item={item} key={index} />
                ))}
            </div>
          </div>
        )}
      </div>
    )
    
}

        
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
