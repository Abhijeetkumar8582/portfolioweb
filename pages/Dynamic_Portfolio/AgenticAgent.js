
const get_datafunction = async (question, jsonName) => {
  let json_data = "";

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
            required: ["question"],
            additionalProperties: false
          },
          strict: true
        }
      },
      {
        type: "function",
        function: {
          name: "dynamic_data",
          description: "Filter and return only the necessary fields from the selected JSON data.",
          parameters: {
            type: "object",
            properties: {
              category: {
                type: "string",
                description: "One of: Skills, Licenses, Projects, Experience"
              },
              data: {
                type: "array",
                description: "Array of data from the selected JSON file",
                items: { type: "object" }
              }
            },
            required: ["category", "data"],
            additionalProperties: false
          },
          strict: true
        }
      }
    ];
  
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
  
  Start by checking what the user is asking and process accordingly.`
          },
          {
            role: "user",
            content: "what are your skils"
          }
        ],
        tools: tools,
        tool_choice: "auto"
      })
    });
  
    const result = await response.json();
    console.log(result);
  };
  