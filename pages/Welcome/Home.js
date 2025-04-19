import React, { useEffect, useState } from "react";
import Style from "/styles/HomePage.module.css";
import Link from "next/link";
import Image from "next/image";
import Head from "next/head";
import Alert from "@mui/material/Alert";
import AOS from 'aos';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import Avatar from '@mui/material/Avatar';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Slide from '@mui/material/Slide';
import Box from '@mui/material/Box';
import AccountCircle from '@mui/icons-material/AccountCircle';
import EmailIcon from '@mui/icons-material/Email';
import CommentIcon from '@mui/icons-material/Comment';


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function Home() {
  const [flipkartRouter, serFlipkartRouter] = useState('/FlipfolioHub/Home')
  useEffect(() => {
    if (sessionStorage.getItem("UserName")) {
      serFlipkartRouter("/FlipfolioHub/MainPage");
    } else {
      serFlipkartRouter("/FlipfolioHub/Home")
    }
  }, [])
  const porfolio = [
    {
      image: "/Image/netflixUi.webp",
      title: "VisionStream",
      link: "/VisionStream/Home",
      description:
        "I attempted to replicate the Netflix UI for my portfolio, and I've included a video detailing my journey within this field.",
    },
    {
      image: "/Image/FlipfolioHubUi.webp",
      title: "FlipfolioHub ",
      link: flipkartRouter,
      description:
        "I'm designing my portfolio as a Flipkart-inspired UI, also developing a search algorithm for easy inquiries about me. Exciting things coming soon!",
    },
    {
      image: "/Image/simpleUi.webp",
      title: "Modern design",
      link: "/Introduction",
      description:
        "This marks the debut of my portfolio website, with exciting plans for the future, including the development of an AI chatbot for interactive engagement.",
    },
    {
      image: "/Image/Instagram_UI.webp",
      title: "InstaSpark",
      link: "/InstaSpark/Home",
      description:
        "Engaged in the art of UI design, I'm crafting visually appealing and interactive experiences!",
    },
    {
      image:"/Image/comingSoon.webp",
      title: "Dynamic portfolio",
      link: "/Dynamic_Portfolio/Home",
      description:
        "Creating a dynamic portfolio with a fresh design, showcasing my data uniquely.",
    },
  ];
  useEffect(() => {
    AOS.init({ duration: 2000 })
  })

  const [alertOpen, alertsetOpen] = useState(true);
  useEffect(() => {
    if (sessionStorage.getItem("MainPage_alert")) {
      alertsetOpen(false);
    }
  });
  const alertBTn = () => {
    sessionStorage.setItem("MainPage_alert", "Completed");
    alertsetOpen(false);
  };

  const [Loading, setLoading] = useState(false)
  const [anotherQuestion, setAnotherQuestion] = useState(false);
  const [openQueries, setOpenQueries] = useState(false);
  const [getAnswerfromPDF, setGetAnswerfromPDF] = useState('')
  const [getQuestion, setQuestion] = useState('')
  const [open, setOpen] = useState({});

  const AnotherQuestionForm = () => {
    setAnotherQuestion(false);
  };

  const onQuestionInput = (e) => {
    setQuestion(e.target.value);
    if (e.key === 'Enter') {
      e.preventDefault();
      findAnswerFromPDF();
    }
  }

  const onAnotherQuestion = (e) => {
    setQuestion(e.target.value);

    if (e.key === 'Enter') {
      e.preventDefault();
      setAnotherQuestion(false)
      setOpenQueries(true)
      findAnswerFromPDF()
    }
  }

  const findAnswerFromPDF = () => {
    setOpen(true);
    setLoading(true)

    var myHeaders = new Headers();

    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      "user_input": getQuestion
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      mode: 'cors'

    };

    fetch("https://abhijeetkumarsearchalgo.cloud/get_answer", requestOptions)
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Network response was not ok.');
        }
      })
      .then(result => {
        setLoading(false)
        setAnotherQuestion(false)
        setOpenQueries(true)
        setGetAnswerfromPDF(result.answer)
        setQuestion('')
      })
      .catch(error => setGetAnswerfromPDF('I apologize, but my automated system is currently inactive and unavailable. Kindly consider revisiting at a later time for further assistance. Thank you for your understanding.'));

  }
  const OnAnotherQuestionAsk = () => {
    setOpenQueries(false)
    setAnotherQuestion(true)
  }
  const OnAnotherQuestionAskBtn = () => {
    setAnotherQuestion(false)
    setOpenQueries(true)
    findAnswerFromPDF()
  }

  const handleCloseQueries = () => {
    setOpenQueries(false)
    setAnotherQuestion(false)
  }
  const handleOpenChatButton = () => setChatOpen(true);
  const handleCloseChatButton = () => setChatOpen(false);
  const [UserName, setUserName] = useState('')
  const [ChatOpen, setChatOpen] = React.useState(false);
  const [UserNameError, setUserNameError] = useState(false)
  const [UserNameMessage, setUserNameMessage] = useState('Name')
  const [UserEmail, setUserEmail] = useState('')
  const [UserEmailError, setUserEmailError] = useState(false)
  const [UserEmailMessage, setUserEmailMessage] = useState('Email')
  const [UserMessage, setUserMessage] = useState('')
  const [isFormSubmitted, setFormsubmitted] = useState(false)
  // const [getAnswerfromPDF, setGetAnswerfromPDF] = useState('')


  const UserNameFeild = (e) => {
      setUserNameError(false)
      setUserNameMessage('Name')
      setUserName(e.target.value)
  }
  const UserEmailFeild = (e) => {
      setUserEmailError(false)
      setUserEmailMessage("Email")
      setUserEmail(e.target.value)

  }
  const UsermessageFeild = (e) => {
      setUserMessage(e.target.value)
  }
  const OnsubmitChatButton = () => {
      const nameRegex = /^[A-Za-z\s]+$/;
      const isNameValid = nameRegex.test(UserName);
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
      const isEmailValid = emailRegex.test(UserEmail)
      if (isEmailValid && isNameValid) {
          setFormsubmitted(true)
          setTimeout(() => {
              setChatOpen(false)
          }, 5000);
          var myHeaders = new Headers();
          myHeaders.append("Authorization", "Bearer patEfFlSQr7VgttWu.23f17b46416f121a81a72f4a8c4e455dfa31404686c55d0d7db5efc734c0480f");
          myHeaders.append("Content-Type", "application/json");
          myHeaders.append("Cookie", "brw=brwnty5S6w9WvoLzZ; AWSALB=DzpPzjhEDzHNWgOlzeS++bKEZJQyTYh4cSj9KUDKc/5xNxAIaFE8dyPHVT/UYKWTdAMY1DOHvRjQVRt7kcRobROxPfTnxpBagyZQdeuHoVxbIQRruSa8NztuRpXs; AWSALBCORS=DzpPzjhEDzHNWgOlzeS++bKEZJQyTYh4cSj9KUDKc/5xNxAIaFE8dyPHVT/UYKWTdAMY1DOHvRjQVRt7kcRobROxPfTnxpBagyZQdeuHoVxbIQRruSa8NztuRpXs");

          var raw = JSON.stringify({
              "fields": {
                  "Name": UserName,
                  "Email": UserEmail,
                  "Message": UserMessage
              }
          });

          var requestOptions = {
              method: 'POST',
              headers: myHeaders,
              body: raw,
              redirect: 'follow'
          };

          fetch("https://api.airtable.com/v0/appHNw9auZyOopEsJ/Table%201", requestOptions)
              .then(response => response.text())
              .then(result => console.log(result))
              .catch(error => console.log('error', error))
      } else if (isEmailValid === false && isNameValid === false) {
          setUserEmailError(true)
          setUserNameError(true)
          setUserEmailMessage("Incorrect Email")
          setUserNameMessage("Incorrect Name")
      }
      else if (isEmailValid === false) {
          setUserEmailError(true)
          setUserEmailMessage("Incorrect Email")

      } else {
          setUserNameError(true)
          setUserNameMessage("Incorrect Name")
      }
  }

  return (
    <>
      <Head>
        <title>Welcome</title>
        <meta property="og:title" content="Abhijeet Kumar" />
        <meta name="description" content="🚀 Abhijeet Kumar: Crafting digital experiences with a blend of frontend finesse and backend wizardry. Join me on a journey through the world of Node.js development! 💻✨" />
        <meta property="og:description" content="🚀 Abhijeet Kumar: Crafting digital experiences with a blend of frontend finesse and backend wizardry. Join me on a journey through the world of Node.js development! 💻✨" />
        <meta property="og:image" content="/Image/mainPageImage.webp" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="628" />
        <meta property="og:url" content="https://abhijeetkumar-developer.netlify.app/" />
        <meta property="og:type" content="https://abhijeetkumar-developer.netlify.app/" />
        <meta property="og:site_name" content="ABHI" />
      </Head>

      {alertOpen && (
        <div data-aos="fade-down">
          <Alert
            sx={{
              bgcolor: "black",
              color: "white",
            }}
            onClose={() => alertBTn()}
          >
            Welcome to my Portfolio website!👨‍💻 Expect some adorable alerts from my
            furry friends🐶{" "}
          </Alert>
        </div>
      )}
      <div data-aos="fade-right">
        <div className={Style.introPageMainDiv}>
          <div className={Style.introPageMainDiv_one}>
            <div>
              <h1 className={Style.text}>Hy! I Am </h1>
            </div>
            <div>
              <h1 className={Style.text_name}>Abhijeet kumar</h1>
            </div>
            <div>
              <p className={Style}>
                Frontend developer delving into backend development using Node.js
                and Python as well.
              </p>
            </div>
          </div>
          <div className={Style.introPageMainDiv_two}>
            <div
              style={{
                maxHeight: "400px",
                maxWidth: "450px",
                display: "flex",
                justifyContent: "flex-end",
                position: "relative",
              }}
            >
              <link
                rel="preload"
                as="image"
                href="/Image/Abhijeet_kumar.webp"
                imageSrcSet="/Image/Abhijeet_kumar.webp 1x"
              />

              <Image
                width={500}
                height={500}
                priority={true}
                style={{ width: "100%", height: "100%", mixBlendMode: "darken" }}
                alt="Abhijeet Kumar"
                decoding="async"
                src="/Image/Abhijeet_kumar.webp"
              />
              <link
                rel="preload"
                as="image"
                href="/Image/donut_3d_shape.webp"
                imageSrcSet="/Image/donut_3d_shape.webp 1x"
              />
              <Image
                width={500}
                height={500}
                priority={true}
                decoding="async"
                className={Style.donut_3d_shape}
                style={{
                  width: "100%",
                  height: "100%",
                  mixBlendMode: "darken",
                  position: "absolute",
                  left: "0",
                  marginLeft: "-308px",
                  marginTop: "-195px",
                }}
                alt="Abhijeet Kumar"
                src="/Image/donut_3d_shape.webp"
              />
            </div>
          </div>

        </div>
      </div>
      <div style={{ backgroundColor: "#f0f8ff" }}>
        <div className={Style.Portfoliotext}>
          <div data-aos="fade-up">
            <div>
              <h4 className={Style.Portfoliotext_text}>
                How would you like to view my portfolio website
              </h4>
            </div>
          </div>
        </div>
        <div data-aos="fade-right"
          data-aos-offset="300"
          data-aos-easing="ease-in-sine">

          <div className={Style.Portfolio_Div}>
            {porfolio.map((element, i) => (
              <Link
                href={element.link}
                className={Style.LinkWithoutUnderline}
                key={i}
              >
                <div className={Style.Container_two_subdiv}>
                  <div className={Style.Container_two_subdiv_imageDiv}>
                    <Image
                      width={250}
                      height={150}
                      className={Style.Container_two_subdiv_imageDiv_image}
                      alt={element.image}
                      src={element.image}
                    />
                  </div>
                  <div className={Style.Container_two_subdiv_heading}>
                    <h4>{element.title}</h4>
                  </div>
                  <div className={Style.Container_two_subdiv_paragraph}>
                    <p style={{ textAlign: 'justify' }}>{element.description}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
        <div className={Style.footer}>
          <div>
            <button className={Style.footer_button} aria-label="Feedback" onClick={() => handleOpenChatButton()}>Feedback 👨‍💻</button>
          </div>
         
          <div>
            <button className={Style.footer_button} aria-label="Any Queries" onClick={() => OnAnotherQuestionAsk()} >Any Queries 👨‍💻</button>
          </div>
        </div>
        <div className={Style.signature}>
            <h6 style={{color:'gainsboro'}}>© | All rights reserved | Abhijeet Kumar</h6>
          </div>
        <Dialog
          open={openQueries}
          TransitionComponent={Transition}
          keepMounted
          onClose={handleCloseQueries}
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle><div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}><Avatar alt="Virtual Abhijeet Bot" loading='lazy' width={50} height={50} src="/Image/abhijeetVirtualBot.webp" /> Virtual Abhijeet Bot </div>

          </DialogTitle>
          <DialogContent>
            {Loading ? (
              <div>
                <div><h6 className={Style.mobileText_content}>  Warning: I'm an AI model, and sensitive information might be inadvertently shared. Please refrain from sharing personal or confidential details.
                </h6></div>
                <div className="load-row">
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>) : (

              <DialogContentText id="alert-dialog-slide-description" className={Style.mobileText_content}>{getAnswerfromPDF}</DialogContentText>)}
          </DialogContent>
          <DialogActions>

            <Button onClick={() => OnAnotherQuestionAsk()}>Another Question</Button>
            <Button onClick={() => handleCloseQueries()}>Close</Button>
          </DialogActions>
        </Dialog>
        <Dialog open={anotherQuestion} onClose={AnotherQuestionForm}>
          <DialogTitle>
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}><Avatar alt="Virtual Abhijeet Bot" width={50} height={50} src="/Image/abhijeetVirtualBot.webp" /> Virtual Abhijeet Bot</div></DialogTitle>
          <DialogContent>
            <DialogContentText className={Style.mobileText_content}>
               Warning: I'm an AI model, and sensitive information might be inadvertently shared. Please refrain from sharing personal or confidential details.
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              onChange={(e) => onQuestionInput(e)}
              onKeyPress={(e) => onAnotherQuestion(e)}
              label="Please ask your question here...."
              type="text"
              fullWidth
              variant="standard"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => AnotherQuestionForm()}>Cancel</Button>
            <Button onClick={() => OnAnotherQuestionAskBtn()}>Ask</Button>
          </DialogActions>
        </Dialog>
        <Dialog
          open={ChatOpen}
          onClose={handleCloseChatButton}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          maxWidth="xl"
        >

          <DialogContent sx={{ p: '0' }}>
            <div className={Style.LetsChatMain_Div}>
              <div className={Style.LetsChatMain_Div_image}>
                <img src='/Image/feedbackImage.webp' className={Style.LetsChatMain_image} />
              </div>
              <div className={Style.LetsChatMain_Div_content}>
                {isFormSubmitted ? (<div style={{ margin: '0px 10px' }}>
                  <p>Thank you for sharing your feedback, {UserName.charAt(0).toUpperCase() + UserName.slice(1).toLowerCase()}!<br />  Your input is valued, and I will be in touch shortly to initiate a conversation.</p>
                </div>) : (<div className={Style.inputBox}>
                  <div className={Style.aboutmeText_div}>
                    <h5 className={Style.aboutmeText}> Seeking Your Valuable Input and Feedback 😊</h5>
                  </div>
                  <div >

                    <div className={Style.fieldBox}>
                      <div className={Style.feedbackField}>
                        <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                          <AccountCircle sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                          <TextField error={UserNameError} id="input-with-sx" onChange={(e) => UserNameFeild(e)} value={UserName} className={Style.field_text} required label={UserNameMessage} variant="standard" />
                        </Box>
                      </div>
                      <div className={Style.feedbackField}>
                        <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                          <EmailIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                          <TextField error={UserEmailError} id="input-with-sx" onChange={(e) => UserEmailFeild(e)} value={UserEmail} className={Style.field_text} required label={UserEmailMessage} variant="standard" />
                        </Box>
                      </div>
                      <div className={Style.feedbackField}>
                        <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                          <CommentIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                          <TextField id="input-with-sx" onChange={(e) => UsermessageFeild(e)} value={UserMessage} className={Style.field_text} label="Message" variant="standard" />
                        </Box>
                      </div>
                    </div>
                  </div>
                  <button className={Style.feedbackButton} aria-label="Form-submittion-button" onClick={OnsubmitChatButton}>Submit</button>
                </div>)}

              </div>
            </div>
          </DialogContent>

        </Dialog>
      </div>
    </>
  );
}

export default Home;
