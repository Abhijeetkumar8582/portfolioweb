import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react'
import Head from 'next/head';
import Image from 'next/legacy/image'
import FlipfolioHubNavBar from './FlipfolioHubNavBar'
import Style from "/styles/FlipfolioHub.module.css";
import experienceJson from '../Json/Expirence.json';
import ProjectJson from '../Json/Projects.json';
import AboutmeLicenses from '../Json/AboutmeLicenses.json';
import AboutmeSkills from '../Json/AboutmeSkills.json'
import Footer from './Footer';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import AccountCircle from '@mui/icons-material/AccountCircle';
import EmailIcon from '@mui/icons-material/Email';
import Box from '@mui/material/Box';
import CommentIcon from '@mui/icons-material/Comment';
import Avatar from '@mui/material/Avatar';
import Slide from '@mui/material/Slide';

import DialogContentText from '@mui/material/DialogContentText';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

function MainPage() {
    const [showExpirenceDiv, setshowExpirenceDiv] = useState(false)
    const [validPincode, setvalidPincode] = useState(false)
    const [pincodeentered, setpincodeentered] = useState(false)
    const [valuefield, setvaluefield] = useState('')
    const [openQueries, setOpenQueries] = useState(false);
    const [mainImageUrl, setMainImageUrl] = useState('/Image/Abhijeetkumar2.webp');
    const pincodeserver = [700122, 560078, 560076];
    const handleClick = useCallback((event) => {
        window.open(event, '_blank');
    }, [])
    const [open, setOpen] = useState({});
    const handleClickOpen = useCallback((tittle) => {
        setOpen({ ...open, [tittle]: true });

    }, [open, setOpen]);

    const handleClose = useCallback((tittle) => {
        setOpen({ ...open, [tittle]: false });
        var card_css_hover = document.querySelectorAll('.card')
        card_css_hover.forEach(function (card) {
            card.classList.remove('hover')
        })
    }, [open, setOpen]);

    const onPincodeEntered = useCallback((e) => {
        let value = e.target.value;
        if (!isNaN(value)) {
            if (e.nativeEvent.inputType === "deleteContentBackward") {
                setvaluefield(value);
            }
            if (valuefield.length <= 5) {
                setvaluefield(value)
            }
        }
    }, [valuefield, setvaluefield]);


    const [screenDimensions, setScreenDimensions] = useState({
        screenWidth: 0,
        screenHeight: 0,
    });

    const handleResize = () => {
        setScreenDimensions({
            screenWidth: window.innerWidth,
            screenHeight: window.innerHeight,
        });
    };

    useEffect(() => {
        if (typeof window !== 'undefined') {
            window.addEventListener('resize', handleResize);
            setScreenDimensions({
                screenWidth: window.innerWidth,
                screenHeight: window.innerHeight,
            });
            return () => {
                window.removeEventListener('resize', handleResize);
            };
        }
    }, []);
    // -___-----------________

    const onPincodeEnteredFunction = useCallback(() => {
        if (valuefield.length == 6) {
            if (pincodeserver.includes(Number(valuefield))) {
                setvalidPincode(true)
                setpincodeentered(true)
            }
            else {
                setpincodeentered(true)
                setvalidPincode(false)
            }
        }
    }, [valuefield, setvalidPincode, setpincodeentered]);

    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClickQuestion = useCallback((event) => {
        setAnchorEl(event.currentTarget);
    }, [setAnchorEl]);

    const handleCloseQuestion = useCallback(() => {
        setAnchorEl(null);
    }, [setAnchorEl]);

    const openquestion = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;
    const handleImageHover = useCallback((newImageUrl) => {
        setMainImageUrl(newImageUrl);
    }, [setMainImageUrl]);
    const aboutRef = useRef(null);
    const experienceRef = useRef(null);
    const projectsRef = useRef(null);
    const achievementsRef = useRef(null);
    const licensesRef = useRef(null);

    const scrollBtn = (ref) => {
        if (ref && ref.current) {
            ref.current.scrollIntoView({ behavior: 'smooth' });
        }
    };


    const [ChatOpen, setChatOpen] = React.useState(false);
    const handleOpenChatButton = () => setChatOpen(true);
    const handleCloseChatButton = () => setChatOpen(false);
    const [Loading, setLoading] = useState(false)
    const [UserName, setUserName] = useState('')
    const [getQuestion, setQuestion] = useState('')
    const [UserNameError, setUserNameError] = useState(false)
    const [UserNameMessage, setUserNameMessage] = useState('Name')
    const [UserEmail, setUserEmail] = useState('')
    const [UserEmailError, setUserEmailError] = useState(false)
    const [UserEmailMessage, setUserEmailMessage] = useState('Email')
    const [UserMessage, setUserMessage] = useState('')
    const [isFormSubmitted, setFormsubmitted] = useState(false)
    const [getAnswerfromPDF, setGetAnswerfromPDF] = useState('')


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

    const [anotherQuestion, setAnotherQuestion] = useState(false);

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
    return (

        <div>
            <Head>
                <title>FlipfolioHub - Abhijeet</title>
                <meta property="og:title" content="FlipfolioHub - Abhijeet" />
                <meta property="og:description" content="I'm designing my portfolio as a FlipfolioHub-inspired UI, also developing a search algorithm for easy inquiries about me. Exciting things coming soon!" />
                <meta property="og:image" content="/Image/FlipfolioHubUi.webp" />
                <meta property="og:image:width" content="1200" />
                <meta property="og:image:height" content="628" />
                <meta property="og:url" content="https://abhijeetkumar-developer.netlify.app/FlipfolioHub/Home" />
                <meta property="og:type" content="website" />
            </Head>
            <FlipfolioHubNavBar />


            <div className={Style.SubNavbar}>
                <h6 className={Style.subNavbarText} onClick={() => scrollBtn(aboutRef)}>About Me</h6>
                <h6 className={Style.subNavbarText} onClick={() => { scrollBtn(experienceRef); setshowExpirenceDiv(true); }} >Experience</h6>
                <h6 className={Style.subNavbarText} onClick={() => scrollBtn(projectsRef)} >Projects</h6>
                <h6 className={Style.subNavbarText} onClick={() => scrollBtn(achievementsRef)} >Achievements</h6>
                <h6 className={Style.subNavbarText} onClick={() => scrollBtn(licensesRef)} >Licenses/Certifications</h6>
            </div>


            <div style={{ padding: '10px' }}>
                <div className={Style.FlipfolioHubMainBox}>
                    <div className={Style.FlipfolioHubMainBox_Image}>
                        <div className={Style.FlipfolioHubMainboxImage_subimage}>
                            <div className={Style.FlipfolioHubMainboxImage_subimage_Box} onMouseOver={() => handleImageHover('/Image/Abhijeetkumar2.webp')}><Image priority={true} width={60} height={60} className={Style.ImageSection} alt="MyImage" src='/Image/Abhijeetkumar2.webp' /></div>
                            <div className={Style.FlipfolioHubMainboxImage_subimage_Box} onMouseOver={() => handleImageHover('/Image/AbhijeetKumar_1.webp')}><Image priority={true} width={60} height={60} alt="MyImage" className={Style.ImageSection} src='/Image/AbhijeetKumar_1.webp' /></div>
                            <div className={Style.FlipfolioHubMainboxImage_subimage_Box} onMouseOver={() => handleImageHover('/Image/abhijeet_kumar_3.jpg')}><Image alt="MyImage" priority={true} width={60} height={60} className={Style.ImageSection} src='/Image/abhijeet_kumar_3.jpg' /></div>
                            <div className={Style.FlipfolioHubMainboxImage_subimage_Box} onMouseOver={() => handleImageHover('/Image/Abhijeet_kumar_4.webp')}><Image priority={true} width={60} height={60} className={Style.ImageSection} alt="MyImage" src='/Image/Abhijeet_kumar_4.webp' /></div>
                        </div>
                        <div className={Style.FlipfolioHubMainboxImage_Mainimage}><Image priority={true} alt="MyImage" className={Style.Main_ImageSection} width={500} height={500} quality={100} src={mainImageUrl} /></div>
                    </div>
                    <div className={Style.FlipfolioHubMainBox_Content}>
                        <div>
                            <p>India &gt; Bangalore &gt; Frontend developer &gt; Abhijeet Kumar</p>
                        </div>
                        <div style={{ marginBottom: '15px' }}>
                            <h3>Abhijeet kumar</h3>
                        </div>
                        <div className={Style.ratingDiv}>
                            <div className={Style.ratingItem}><i className="fa fa-star" aria-hidden="true"></i><span>4.17</span></div>
                            <div>
                                <span> 578 ratings and 614 reviews   </span>
                            </div>
                        </div>
                        <div>
                            <h6>Available offers</h6>
                            <div className={Style.Available_offers_div}> <Image alt="MyImage" loading='lazy' width={20} height={20} src='/Image/salesLogo.webp' className={Style.Available_offers_div_img} /><span className={Style.Contentjustify}> &nbsp;Experience my passion for creativity and innovation through an engaging portfolio.</span></div>
                            <div className={Style.Available_offers_div}> <Image alt="MyImage" loading='lazy' width={20} height={20} src='/Image/salesLogo.webp' className={Style.Available_offers_div_img} /><span className={Style.Contentjustify}> &nbsp;Discover my specialization through a curated selection of my best work.</span></div>
                            <div className={Style.Available_offers_div}> <Image alt="MyImage" loading='lazy' width={20} height={20} src='/Image/salesLogo.webp' className={Style.Available_offers_div_img} /><span className={Style.Contentjustify}> &nbsp;See how I've helped clients achieve their goals through my portfolio solutions.</span></div>
                        </div>
                        <div style={{ marginBottom: '50px' }}>
                            <div style={{ margin: '20px 0px 5px' }}><i className="fa fa-map-marker" style={{ color: 'red' }} aria-hidden="true"></i><span> Please enter pincode</span></div>
                            <div style={{ display: 'inline-flex' }}>
                                <input className={Style.pincodeInput} placeholder="Enter 6 digit pincode..." value={valuefield} onChange={(e) => onPincodeEntered(e)} />
                                <button aria-label="pincode" className={Style.pincodebtn} onClick={onPincodeEnteredFunction}><span className={Style.pincodeCheckText}>Check</span></button>

                            </div>

                            {pincodeentered ? (<div>{validPincode ? <p>Work from office is possible</p> : <p>Remote Work only <i onClick={handleClickQuestion} class="fa fa-question-circle" aria-hidden="true"></i></p>}</div>) : null}
                            <Popover
                                id={id}
                                open={openquestion}
                                anchorEl={anchorEl}
                                onClose={handleCloseQuestion}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'left',
                                }}
                            >
                                <div style={{ maxWidth: '500px' }}>
                                    <Typography sx={{ p: 2 }}>Kindly specify the designated work location. I am presently based in Bangalore and eager to know the intended work site.</Typography>
                                </div>
                            </Popover>
                        </div>
                        <div style={{ marginBottom: '30px', gap: "10px", display: 'flex' }}>
                            <button aria-label="letsTalkBtn" className={Style.letsTalkBtn} onClick={() => handleOpenChatButton()}><h6 className={Style.mobileText_content}>let's have a chat 💬</h6></button>
                            <button aria-label="letsTalkBtn" className={Style.OnAnotherQuestionAsk} onClick={() => OnAnotherQuestionAsk()}><h6 className={Style.mobileText_content}>Know about Me 🤖</h6></button>

                        </div>
                        <Dialog
                            open={openQueries}
                            TransitionComponent={Transition}
                            keepMounted
                            onClose={handleCloseQueries}
                            aria-describedby="alert-dialog-slide-description"
                        >
                            <DialogTitle><div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}><Avatar alt="Virtual Abhijeet Bot" src="/Image/abhijeetVirtualBot.webp" /> Virtual Abhijeet Bot </div>
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
                                <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}><Avatar alt="Virtual Abhijeet Bot" Loading='lazy' width={50} height={50}  src="/Image/abhijeetVirtualBot.webp" /> Virtual Abhijeet Bot</div></DialogTitle>
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
                                        <img src="/Image/FlipfolioHub_connect_image.webp" className={Style.LetsChatMain_image} />
                                    </div>
                                    <div className={Style.LetsChatMain_Div_content}>
                                        {isFormSubmitted ? (<div style={{ margin: '0px 10px' }}>
                                            <p>Thank you for providing your information, {UserName.charAt(0).toUpperCase() + UserName.slice(1).toLowerCase()}!<br /> I appreciate your input. I will be in touch shortly to initiate a conversation.</p>
                                        </div>) : (<div className={Style.inputBox}>
                                            <div>
                                                <h5 className={Style.aboutmeText}> Let's have some discussion!!</h5>
                                            </div>
                                            <div >

                                                <div >
                                                    <div style={{ marginTop: '10px' }}>
                                                        <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                                                            <AccountCircle sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                                                            <TextField error={UserNameError} id="input-with-sx" onChange={(e) => UserNameFeild(e)} value={UserName} style={{ width: '270px' }} required label={UserNameMessage} variant="standard" />
                                                        </Box>
                                                    </div>
                                                    <div style={{ marginTop: '10px', color: 'white' }}>
                                                        <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                                                            <EmailIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                                                            <TextField error={UserEmailError} id="input-with-sx" onChange={(e) => UserEmailFeild(e)} value={UserEmail} style={{ width: '270px' }} required label={UserEmailMessage} variant="standard" />
                                                        </Box>
                                                    </div>
                                                    <div style={{ marginTop: '10px' }}>
                                                        <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                                                            <CommentIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                                                            <TextField id="input-with-sx" onChange={(e) => UsermessageFeild(e)} value={UserMessage} style={{ width: '270px' }} label="Message" variant="standard" />
                                                        </Box>
                                                    </div>
                                                </div>
                                            </div>
                                            <button className={Style.button_FlipfolioHub_chat} onClick={OnsubmitChatButton}>Submit</button>
                                        </div>)}

                                    </div>
                                </div>
                            </DialogContent>

                        </Dialog>



                        <div ref={aboutRef}>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <h4 className={Style.aboutmeText}>About Me</h4>
                            </div>
                            <div>
                                <p className={Style.Contentjustify}>Hi there! I'm Abhijeet, a tech enthusiast who loves to explore new technologies. I have a strong passion for creating digital content that thrives on the internet. Back in 2020, my journey into web development began with SQL, and since then, I've been building apps using React, which has been an incredibly exciting experience.</p>
                                <p className={Style.Contentjustify}>Currently, I'm fortunate to be working for an AI startup where my responsibilities include designing chatbots, integrating them into systems, and assisting customers with their inquiries. My ultimate goal is to expand my knowledge across various programming languages. I strongly believe that this pursuit will enable me to become a more adaptable and versatile developer, capable of taking on diverse challenges.</p>
                                <p className={Style.Contentjustify}>Occasionally, I find myself contemplating whether I'm fixing a bug or if the bug is the one in control. Interestingly, I even dream about bugs, envisioning epic battles where I assume the role of Godzilla, the mighty king of monsters, confronting the formidable King Kong. It's an exhilarating and surreal experience, to say the least.</p>
                            </div>
                        </div>

                        <div ref={experienceRef}>
                            <div className={Style.divboxHeading} onClick={() => showExpirenceDiv ? setshowExpirenceDiv(false) : setshowExpirenceDiv(true)} >
                                <h4 className={Style.aboutmeText}>Experience</h4>
                                <button aria-label={showExpirenceDiv ? 'Collapse Experience' : 'Expand Experience'} className={Style.showdivBtn} onClick={() => showExpirenceDiv ? setshowExpirenceDiv(false) : setshowExpirenceDiv(true)}>{showExpirenceDiv ? (<i className="fa fa-minus" aria-hidden="true"></i>) : (<i className="fa fa-plus" aria-hidden="true"></i>)}</button>
                            </div>
                            {showExpirenceDiv ? (<div>
                                {experienceJson.map((element, i) => (
                                    <div className={Style.experienceJsonmaindiv} key={i}>
                                        <div className={Style.experienceJsonImageDiv}>
                                            <Image alt="MyImage" loading='lazy' width={50} height={50} style={{ maxWidth: "100%" }} src={element.logo} />
                                        </div>
                                        <div className={Style.experienceJsondiv} >
                                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                <p >{element.desginstion}</p>
                                                <p>{element.timeline}</p>
                                            </div>
                                            <p className={Style.Contentjustify}>{element.jobRole}</p>

                                        </div>
                                    </div>

                                ))}
                            </div>) : null}
                        </div>
                    </div>
                </div>

                <div style={{ background: 'white', marginTop: '15px' }}>
                    <div className={Style.Skills_sub_Main_div}>
                        {AboutmeSkills.map((element, i) => (
                            <div className={Style.Skills_sub_div} key={i}>
                                <div style={{ display: 'flex', alignItems: 'center' }}><Image alt="MyImage" loading='lazy' width={40} height={40} src={element.logo} style={{ maxWidth: '40px', marginLeft: '5px' }} /></div>
                                <div style={{ display: 'flex', alignItems: 'center' }}>{element.skills}</div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className={Style.projectDiv} ref={projectsRef} >
                    <div className={`${Style.projectdivtext} ${Style.headingtext}`}>
                        <h4>You might be interested in my Projects</h4>
                    </div>
                    <div className={Style.FlipfolioHub_Content_Skills_div_container}>
                        <div className={Style.FlipfolioHub_Content_Skills_div_Main}>
                            {ProjectJson.map((element, i) => (
                                <div className={Style.projectDivItem} key={i}>
                                    <div><Image alt="MyImage" loading='lazy' width={400} height={200} src={element.image} /></div>
                                    <div className={Style.projectDivItemcontent}>
                                        <h6>{element.title}</h6>
                                        <p className={Style.Contentjustify}>{element.description}</p>
                                        <p className={Style.Contentjustify}><strong>{element.code}</strong></p>
                                        <button aria-label='viewProjectBtn' className={Style.viewProjectBtn} onClick={() => handleClick(element.button)}><strong>View Project</strong></button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className={Style.AchievementsMainDiv} ref={achievementsRef}>
                    <div style={{ padding: '15px', background: 'white' }}>
                        <div className={`${Style.AchievementsdivText} ${Style.headingtext}`}>
                            <h4>Recent Achievements</h4>
                        </div>
                        <div className={Style.Contentjustify}>
                            I have secured the third position in the yellow.ai Hackathon by proposing an innovative use case for our organization. We came up with an idea to develop a chatbot that would allow restaurants to donate their excess food to nearby non-profit organizations. The bot would collect all the necessary information about the food, owners, and other relevant details to facilitate the process. With the help of my teammates, we were able to achieve this accomplishment, and I am incredibly proud of our efforts. <a href="https://www.credential.net/0a51513b-b774-4d73-90d1-75a96b80603e" target="_blank" style={{ color: "tomato !important " }}><strong>View Certificate</strong></a>
                        </div>
                    </div>
                </div>

                <div className={Style.LicensesmainDiv} ref={licensesRef}>
                    <div style={{ padding: '15px', background: 'white' }}>
                        <div className={`${Style.AchievementsdivText} ${Style.headingtext}`}  >
                            <h4>Frequently got Licenses/Certifications</h4>
                        </div>
                        <div className={Style.Licensesmaindiv_map} >
                            <div className={Style.Licensesmaindiv_map_Main_div}>
                                {AboutmeLicenses.map((element, i) => (
                                    <div className={Style.LicensesmainDivitem} key={i}>

                                        <div style={{ width: '10%', alignItems: 'flex-start', display: 'flex' }}> <Image alt="MyImage" loading='lazy' width={500} height={500} src={element.logo} style={{ width: '100%', margin: '0px 0px' }} /></div>
                                        <div className={Style.LicensesmainDivitemcontent}>
                                            <div><h6>{element.tittle}</h6></div>
                                            <div><p className={Style.Contentjustify}>{element.description}</p></div>
                                            <button aria-label="viewProjectBtn" className={Style.viewProjectBtn} onClick={() => handleClickOpen(element.tittle)} >View Certificate</button>
                                        </div>
                                        <Dialog
                                            disablePortal
                                            sx={{ width: "100%" }}
                                            open={open[element.tittle] || false}
                                            onClose={() => handleClose(element.tittle)}
                                            maxWidth="xl"
                                        >
                                            <DialogTitle>{element.tittle}</DialogTitle>
                                            <DialogContent>
                                                <Image loading='lazy' src={element.certificate} onError={() => { element.certificate = "/Image/aboutPageImage.jpg" }} alt={element.tittle} width={950} height={550}></Image>
                                            </DialogContent>
                                            <DialogActions>
                                                <Button aria-label="expirenceBTn" onClick={() => handleClose(element.tittle)}>Perfect!!!</Button>
                                            </DialogActions>
                                        </Dialog>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    )
}

export default MainPage