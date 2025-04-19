import React, { useState } from "react";
import Style from "/styles/Netflix.module.css";
import { useRouter } from "next/router";
import Link from "next/link";
import Head from "next/head";


function Home() {
    const router = useRouter();
    const [openAccordionIndex, setOpenAccordionIndex] = useState(-1);
    const accordionData = [
        {
            title: "What educational background do you have in this field?",
            content:
                "I have completed my B.Com degree and subsequently transitioned my career into this particular field. I am continuously engaging in learning opportunities and have plans for further studies to advance my knowledge in this domain.",
        },
        {
            title: "Are you familiar with Data Structures and Algorithms (DSA)?",
            content: `Yes, I have started learning DSA recently. Currently, I am focusing on understanding arrays and strings in-depth. I find it challenging and exciting to explore the various problem-solving techniques.`,
        },
        {
            title: "Have you won any awards or recognition for your work?",
            content:
                "Yes, I am proud to have secured the third position in the prestigious yellow.ai Hackathon. ",
        },
    ];
    const redirect = () => {
        router.push("/VisionStream/Main");
    }
    const redirect_user = (e) => {
        router.push(e)
      }
    return (
        <>

            <Head>
                <title>VisionStream - Abhijeet</title>
                <meta property="og:title" content="VisionStream - Abhijeet" />
                <meta property="og:description" content="I attempted to replicate the Netflix UI for my portfolio, and I've included a video detailing my journey within this field." />
                <meta property="og:image" content="/Image/netflixUi.webp" />
                <meta property="og:image:width" content="1200" />
                <meta property="og:image:height" content="628" />
                <meta property="og:url" content="https://abhijeetkumar-developer.netlify.app/VisionStream/Home" />
                <meta property="og:type" content="website" />
            </Head>
            <div className={Style.MainDiv}>
                <div className={Style.MainPageSectionOne}>
                    {/* ...................................................................................................................................*/}
                    <div className={Style.NavbarHeadMain}>
                        <div style={{ display: "flex", alignItems: "center" }}>
                            <Link style={{ textDecoration: 'none' }} href='/'><h5 className={Style.AbhiFlexText}>Abhi</h5></Link>
                        </div>
                        <div style={{ display: "flex" }}>
                            <select className={Style.selectLanguage}>
                                <option>English</option>
                                <option>Hindi</option>
                            </select>
                            <button aria-label="signIn_Btn" className={Style.siginBtn}>Sign In</button>
                        </div>
                    </div>
                    {/* ...................................................................................................................................*/}
                    <div>
                        <div className={Style.MainHeadingDiv}>
                            <div className={Style.HeadingMainPage}>
                                {" "}
                                Welcome to the Gateway of Creative Entertainment!
                            </div>
                            <div className={Style.subHeadingMainPageOne}>
                                We believe that creativity knows no bounds.
                            </div>

                            <div className={Style.subHeadingMainPageTwo}>
                                Click the "Get started" button to access my portfolio.
                            </div>
                        </div>
                    </div>
                    <div className={Style.HeadingMainPageInputDiv}>
                        <div className={Style.HeadingMainPageInputSubDiv} style={{}}>
                            <input
                                className={Style.HeadingMainPageInputSubDivEmail}

                                placeholder="Email address"
                            />
                        </div>
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "center",
                                margin: " 0px 10px 10px 0px",
                            }}
                        >
                            <button aria-label="emailID_Entered" onClick={redirect} className={Style.emailIDEnteredbtn}>
                                {" "}
                                Get Started{" "}
                                <i className="fa fa-chevron-right" aria-hidden="true"></i>
                            </button>
                        </div>
                    </div>
                </div>
                {/* ...................................................................................................................................*/}
                <div style={{ background: "gray", height: "5px" }}></div>
                <div className={Style.MainPageSectionTwo}>
                    <div className={Style.MainPageSectionTwo_subdivOne}>
                        <h1 className={Style.MainPageSectionTwo_subdivOne_headingOne}>
                            User-Friendly Interface
                        </h1>
                        <h5 className={Style.MainPageSectionTwo_subdivOne_headingtwo}>
                            {" "}
                            Cross-platform synchronization ensures that your creative journey
                            remains uninterrupted.
                        </h5>
                    </div>
                    <div className={Style.MainPageSectionTwo_subdivtwo}>
                        <div style={{ maxWidth: "300px" }}>
                            <img
                                style={{ width: "100%" }}
                                src="/Image/walkingDuck.gif"
                            />
                        </div>
                    </div>
                </div>
                {/* ...................................................................................................................................*/}
                <div style={{ background: "gray", height: "5px" }}></div>
                <div className={Style.MainPageSectionThree}>
                    <div className={Style.MainPageSectionThree_subdivone}>
                        <div style={{ maxWidth: "300px" }}>
                            <img
                                style={{ width: "100%" }}
                                src="/Image/headace.gif"
                            />
                        </div>
                    </div>
                    <div className={Style.MainPageSectionThree_subdivOne}>
                        <h1 className={Style.MainPageSectionThree_subdivOne_headingOne}>
                            {" "}
                            One Masterpiece at a Time
                        </h1>
                        <h5 className={Style.MainPageSectionThree_subdivOne_headingtwo}>
                            {" "}
                            Project Insight: Showcasing my unique creations and unraveling
                            your artistic journey!
                        </h5>
                    </div>
                </div>
                {/* ...................................................................................................................................*/}
                <div style={{ background: "gray", height: "5px" }}></div>
                <div className={Style.MainPageSectionFour}>
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            margin: "10px 0px",
                            color: "white",
                        }}
                    >
                        <h2 className={Style.FAQ_text}>
                            Frequently Asked Questions
                        </h2>
                    </div>
                    <div>
                        {accordionData.map((element, i) => (
                            <div style={{ marginBottom: "10px" }} key={i} onClick={() => setOpenAccordionIndex(prevIndex => prevIndex === i ? -1 : i)}>
                                <div className={Style.accordainSubDiv_title}>
                                    <h5 className={Style.accordainSubDiv_title_text}>{element.title}</h5>
                                    <div>
                                        {openAccordionIndex === i ? (
                                            <i
                                                className="fa fa-times"
                                                aria-hidden="true"
                                            ></i>
                                        ) : (
                                            <i
                                                className="fa fa-plus"
                                                  aria-hidden="true"
                                            ></i>
                                        )}
                                    </div>
                                </div>
                                {openAccordionIndex === i ? (
                                    <div className={Style.accordainSubDiv}>
                                        <h6 className={Style.accordainSubDiv_content_text}>{element.content}</h6>
                                    </div>
                                ) : null}
                            </div>
                        ))}
                    </div>
                </div>
                {/* ...................................................................................................................................*/}
                <div style={{ background: "gray", height: "5px" }}></div>
                
                <div style={{ backgroundColor: 'black' }}>
                    <div className={Style.FooterBar_container}>
                        <div className={Style.FooterBar_container_sectionOne_div_one}>
                            <p className={Style.footer_font_text}>Check out my other Portfolio design</p>
                        </div>
                        <div className={Style.FooterBar_container_sectionOne_div_two}>
                            <div>
                                <button className={Style.redirect_btn} onClick={() => sessionStorage.getItem("UserName")?redirect_user("/FlipfolioHub/MainPage"):redirect_user("/FlipfolioHub/Home")}><p className={Style.footer_font_text}>FlipfolioHub</p></button>
                            </div>
                            <div>
                                <button className={Style.redirect_btn} onClick={() => redirect_user("/InstaSpark/Home")}><p className={Style.footer_font_text}>InstaSpark</p></button>
                            </div>
                            <div>
                                <button className={Style.redirect_btn} onClick={() => redirect_user("/Introduction")}><p className={Style.footer_font_text}>My Design</p></button>
                            </div>
                            <div>
                                <button className={Style.redirect_btn} onClick={() => redirect_user('/Dynamic_Portfolio/Home')}> <p className={Style.footer_font_text}>Dynamic Portfolio(WIP)</p></button>
                            </div>
                        </div>
                    </div>
                    <div className={Style.FooterBar_container_two}>
                        <p className={Style.footer_font_text_other_text}>Handcrafted by Abhijeet kumar @2023</p>
                    </div>
                </div>

            </div>
        </>
    );
}

export default Home;
