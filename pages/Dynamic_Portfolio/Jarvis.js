import React, { useEffect, useRef, useState } from 'react';
import styles from '../../styles/Dynamic.module.css';
import AboutmeSkills from "../Json/AboutmeSkills.json";
import AboutmeLicenses from "../Json/AboutmeLicenses.json";
import AboutmeProject from "../Json/Projects.json";
import AboutmeExpirence from "../Json/Expirence.json";


const Jarvis = () => {
  const jarvisRef = useRef(null);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [userQuestion, setUserQuestion] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  // Simple function to speak text
  const speak = (text) => {
    console.log('Speaking:', text);
    
    // Cancel any ongoing speech
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
      
      const utterance = new SpeechSynthesisUtterance(text);
      
      utterance.onstart = () => {
        console.log('Speech started');
        setIsSpeaking(true);
        if (jarvisRef.current) {
          jarvisRef.current.classList.add(styles.speaking);
        }
      };
      
      utterance.onend = () => {
        console.log('Speech ended');
        setIsSpeaking(false);
        if (jarvisRef.current) {
          jarvisRef.current.classList.remove(styles.speaking);
        }
      };
      
      utterance.onerror = (event) => {
        console.error('Speech error:', event);
        setIsSpeaking(false);
        if (jarvisRef.current) {
          jarvisRef.current.classList.remove(styles.speaking);
        }
      };
      
      window.speechSynthesis.speak(utterance);
    } else {
      console.error('Speech synthesis not supported');
    }
  };

  // Listen for custom events
  useEffect(() => {
    const handleSpeakEvent = (event) => {
      console.log('Event received:', event);
      if (event.detail && event.detail.text) {
        // First speak the question to acknowledge it
        // speak(`You asked: ${event.detail.text}`);
        
        // Then call OpenAI to get the response
        callOpenAI(event.detail.text);
      }
    };

    document.addEventListener('jarvisSpeak', handleSpeakEvent);
    
    // Test speech on mount
    setTimeout(() => {
      speak('Jarvis is ready');
    }, 1000);
    
    return () => {
      document.removeEventListener('jarvisSpeak', handleSpeakEvent);
    };
  }, []);

  
const get_datafunction = async (question, jsonName) => {
  let json_data = "";
  console.log(jsonName,"JsonName");

  switch (jsonName) {
    case "Skills":
      json_data = AboutmeSkills;
      break;
    case "Licenses":
      json_data = AboutmeLicenses;
      break;
    case "Projects":
      json_data = AboutmeProject;
      break;
    case "Experience":
      json_data = AboutmeExpirence;
      break;
    default:
      throw new Error("Invalid JSON name provided.");
  }

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: `You are an intelligent assistant. Use the provided JSON data to answer the user's question accurately. Only return relevant values from the dataset:\n\n${JSON.stringify(
            json_data
          )}`
        },
        {
          role: "user",
          content: question
        }
      ],
      temperature: 0.3,
      max_tokens: 800
    })
  });

  const result = await response.json();
  return result.choices[0].message.content;
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
              question: {
                type: "string",
                description: "The question asked by the user about Abhijeet."
              },
              jsonName: {
                type: "string",
                description: "You should return the json file name based on question (Skills, Licenses, Projects, or Experience)"
              }
            },
            required: ["question", "jsonName"],
            additionalProperties: false
          },
          strict: true
        }
      },
      // {
      //   type: "function",
      //   function: {
      //     name: "dynamic_data",
      //     description: "Filter and return only the necessary fields from the selected JSON data.",
      //     parameters: {
      //       type: "object",
      //       properties: {
      //         category: {
      //           type: "string",
      //           description: "One of: Skills, Licenses, Projects, Experience"
      //         },
      //         data: {
      //           type: "array",
      //           description: "Array of data from the selected JSON file",
      //           items: { 
      //             type: "object",
      //             additionalProperties: false
      //           }
      //         }
      //       },
      //       required: ["category", "data"],
      //       additionalProperties: false
      //     },
      //     strict: true
      //   }
      // }
    ];
  
    try {
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`
        },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          messages: [
            {
              role: "system",
              content: `You are an AI assistant for Abhijeet Kumar. Present yourself as him when replying to users.
  
  If a user asks a question about Abhijeet's profile, skills, certifications, projects, or work experience:
  
  1. First call the function \`get_datafunction\` with the question to detect which JSON dataset to use.
  
  2. Then use \`dynamic_data\` to filter only the necessary fields from the matching dataset before presenting the result to the user.
  
  Do not show all data, only the relevant and required fields.
  
  Start by checking what the user is asking and process accordingly. You should able to get jsonName by your own`
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
      console.log(result);
      
      // Handle tool calls if present
      if (result.choices && result.choices.length > 0 && result.choices[0].message) {
        const message = result.choices[0].message;
        
        // If there are tool calls, process them
        if (message.tool_calls && message.tool_calls.length > 0) {
          let responseContent = "";
          
          // Process each tool call
          for (const toolCall of message.tool_calls) {
            if (toolCall.function && toolCall.function.name === "get_datafunction") {
              try {
                const args = JSON.parse(toolCall.function.arguments);
                const dataResponse = await get_datafunction(args.question, args.jsonName);
                responseContent = dataResponse;
              } catch (error) {
                console.error("Error processing get_datafunction:", error);
              }
            }
          }
          
          // If we have a response, speak it
          if (responseContent) {
            speak(responseContent);
            return responseContent;
          }
        }
        
        // If no tool calls or no response from tool calls, use the message content
        if (message.content) {
          speak(message.content);
          return message.content;
        }
      }
      
      // Fallback if no valid response
      console.error("Invalid response format from OpenAI");
      speak("I'm sorry, I couldn't process your question properly.");
      return null;
    } catch (error) {
      console.error("Error calling OpenAI:", error);
      speak("I'm sorry, there was an error processing your question.");
      return null;
    }
  };
  
  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (userQuestion.trim()) {
      setIsProcessing(true);
      callOpenAI(userQuestion)
        .finally(() => {
          setIsProcessing(false);
          setUserQuestion('');
        });
    }
  };

  return (
    <div className={styles.jarvisContainer}>
      <div className={styles.jarvisCore} ref={jarvisRef} id="jarvis">
        <div className={styles.waveform}>
          <div className={styles.bar} style={{ animationDelay: '0s' }}></div>
          <div className={styles.bar} style={{ animationDelay: '0.1s' }}></div>
          <div className={styles.bar} style={{ animationDelay: '0.2s' }}></div>
          <div className={styles.bar} style={{ animationDelay: '0.3s' }}></div>
          <div className={styles.bar} style={{ animationDelay: '0.4s' }}></div>
          <div className={styles.bar} style={{ animationDelay: '0.5s' }}></div>
          <div className={styles.bar} style={{ animationDelay: '0.6s' }}></div>
        </div>
      </div>
      
      {/* <form onSubmit={handleSubmit} className={styles.questionForm}>
        <input
          type="text"
          value={userQuestion}
          onChange={(e) => setUserQuestion(e.target.value)}
          placeholder="Ask me anything..."
          disabled={isProcessing || isSpeaking}
          className={styles.questionInput}
        />
        <button 
          type="submit" 
          disabled={isProcessing || isSpeaking || !userQuestion.trim()}
          className={styles.submitButton}
        >
          {isProcessing ? 'Processing...' : 'Ask'}
        </button>
      </form> */}
    </div>
  );
};

export default Jarvis;
