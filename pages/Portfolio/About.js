import { useCallback, useEffect } from 'react'
import Image from 'next/legacy/image'
import aboutJson from '../Json/AboutmeSkills.json'
import licenses from '../Json/AboutmeLicenses.json'
import { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Head from 'next/head';
import AOS from 'aos';
import NavBar from './NavBar';





function About() {
    useEffect(() => {
        AOS.init({ duration: 2000 })
    })

    const [open, setOpen] = useState({});
    const handleClickOpen = useCallback((tittle) => {
        setOpen({ ...open, [tittle]: true });

    }, [setOpen]);

    const handleClose = useCallback((tittle) => {
        setOpen({ ...open, [tittle]: false });
        var card_css_hover = document.querySelectorAll('.card')
        card_css_hover.forEach(function (card) {
            card.classList.remove('hover')
        })
    }, [setOpen]);

    return (
        <>
            <Head>
                <title >Abhijeet Kumar</title>
                <meta property="og:title" content="Abhijeet Kumar" />
                <meta property="og:description" content="A dedicated frontend developer with a strong inclination for web development and hands-on experience in crafting chatbots, while also exploring the backend" />
                <meta property="og:image" content="/Image/simpleUi.webp" />
                <meta property="og:image:width" content="1200" />
                <meta property="og:image:height" content="628" />
                <meta property="og:url" content="https://abhijeetkumar-developer.netlify.app/Introduction" />
                <meta property="og:type" content="website" />
            </Head>
            <NavBar />
            <div data-aos="fade-right">
                <div style={{ marginTop: "70px" }}></div>

                <div className="row clearfix" style={{ width: '100vw' }}>
                    <div className="col-sm aboutme_section " >
                        <h1 className="textfont  text-center my-2">So, who am I?</h1>
                        <h5 className="content mobile_content my-3 mx-2 mx-sm-5">
                            Hello, I'm Abhijeet, a passionate tech enthusiast always eager to explore new technologies. I find joy in creating digital content that thrives on the internet. My interest in web development started with SQL back in 2020, and now building apps using React.
                        </h5>
                        <h5 className="content mobile_content my-3 mx-2 mx-sm-5">
                            Currently, I work for an AI startup where I am responsible for designing chatbots, integrating them, and resolving customer inquiries. My goal is to acquire knowledge about as many programming languages as possible, as I believe it will help me become a more versatile developer.
                        </h5>
                        <h5 className="content mobile_content my-3 mx-2 mx-sm-5">
                            At this moment, I'm actively engaged in expanding my knowledge of generative AI while diligently honing my skills in data structures and algorithms. I'm deeply committed to self-improvement, striving to become proficient in these domains for future opportunities and challenges.
                        </h5>
                    </div>
                    <div className="col-sm aboutme_section_image">
                        <Image src="/Image/aboutPageImage.webp" priority={true} className="col-md-6 float-md-end mb-3 my-3 ms-md-3 Imagedisplay" width={700} height={400} alt="AboutMe" />
                    </div>
                </div>
            </div>


            <div data-aos="zoom-in">
                <h1 className='textfont  text-center my-3' > Skills & Abilities</h1>
            </div>

            <div className='scroll-container'>
                {aboutJson.map((element, index) => (
                    <div key={index}>
                        <div data-aos="fade-right">
                            <div className="my-3 mx-3 skillsDiv" >
                                <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                                    <Image src={element.logo} width={50} height={50} className="-img-top" alt={element.skills} />
                                </div>
                                <div className="-body" style={{ width: "80%", margin: "auto" }}>
                                    <p className="text-center" style={{ fontFamily: 'Verdana', margin: 0 }}><strong>{element.skills}</strong></p>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}

            </div>



            <div data-aos="zoom-in">
                <h1 className='textfont text-center my-5' > Licenses & Certifications</h1>
            </div>


            <div className="" style={{ margin: '0px 1rem', display: 'flex', justifyContent: 'flex-start', overflowX: 'scroll', gap: "20px" }}>
                {licenses.map((element, index) => (
                    <div style={{ maxWidth: '320px', gap: "20px" }} key={element.tittle}>
                        <div data-aos="fade-down">
                            <div className="card">
                                <div className="header">
                                    <div className="image">
                                        <Image src={element.logo} style={{ width: "100%" }} width={100} height={100} loading='lazy' alt="Card image cap" />
                                    </div>
                                    <div className='name_div'>
                                        <p className="name">{element.tittle}</p>
                                    </div>
                                </div>
                                <div style={{ height: '80%', marginBottom: '10px' }}>
                                    <p className="message">
                                        {element.description}
                                    </p>
                                </div>
                                <div style={{ height: '10%' }}>
                                    <button className='action' aria-label="Certificate" onClick={() => handleClickOpen(element.tittle)}>
                                        Certificate
                                    </button>
                                </div>
                            </div>

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
                                <Image src={element.certificate} onError={() => { element.certificate = "/Image/aboutPageImage.jpg" }} loading='lazy' alt={element.tittle} width={950} height={550}></Image>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={() => handleClose(element.tittle)}>Perfect!!!</Button>
                            </DialogActions>
                        </Dialog>
                    </div>

                ))}

            </div>


            <div data-aos="zoom-in">
                <h1 className=' textfont text-center my-5' > Reward & Recognition</h1>
            </div>
            <div data-aos="fade-up"
                data-aos-anchor-placement="top-bottom">
                <div className='container' >
                    <div className='box'>

                        <div style={{ padding: "10px" }}></div>
                        <h4 className='rewards text-center my-3' style={{ Top: "10px", padding: "10px", color: "orange", fontFamily: "initial", textAlign: 'center' }}>Yellow.ai Hackathon</h4>
                        <p className='rewards_text my-3 mx-3 '>I have secured the third position in the yellow.ai Hackathon by proposing an innovative use case for our organization. We came up with an idea to develop a chatbot that would allow restaurants to donate their excess food to nearby non-profit organizations. The bot would collect all the necessary information about the food, owners, and other relevant details to facilitate the process. With the help of my teammates, we were able to achieve this accomplishment, and I am incredibly proud of our efforts. <a href="https://www.credential.net/0a51513b-b774-4d73-90d1-75a96b80603e" target="_blank" style={{ color: "tomato !important " }}><strong>View Certificate</strong></a></p>
                        <div style={{ padding: "10px" }}></div>
                    </div>
                </div>
            </div>



        </>
    )
}


export default About