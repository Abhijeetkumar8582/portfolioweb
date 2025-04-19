import React, { useCallback, useState } from "react";
import Style from "/styles/Netflix.module.css";
import experienceJson from "../Json/Expirence.json";
import ProjectJson from "../Json/Projects.json";
import AboutmeSkills from "../Json/AboutmeSkills.json";
import AboutmeLicenses from "../Json/AboutmeLicenses.json";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Image from "next/image";
import Button from "@mui/material/Button";
import Head from "next/head";
import { useRouter } from "next/router";

function Main() {
    const router = useRouter();
    const [islicenseOpen, setislicenseOpen] = useState(false);
    const [displaylicense, setdisplaylicense] = useState(4);
    const [isProjectDiv, setisProjectDiv] = useState(false);
    const [disProjectDiv, setdisProjectDiv] = useState(4);
    const [isdisplaylicenseOpen, setdisplaylicenseOpen] = useState(false);
    const [displayExp, setdisplayExp] = useState(2);
    const [isdisplayExpOpen, setdisplayExpClose] = useState(false);
    const [open, setOpen] = useState({});
    const handleClickOpen = useCallback(
        (tittle) => {
            setOpen({ ...open, [tittle]: true });
            setislicenseOpen(true);
        },
        [setOpen, setislicenseOpen]
    );

    const handleClose = useCallback(
        (tittle) => {
            setOpen({ ...open, [tittle]: false });
            var card_css_hover = document.querySelectorAll(".card");
            card_css_hover.forEach(function (card) {
                card.classList.remove("hover");
            });
            setislicenseOpen(false);
        },
        [setOpen, setislicenseOpen]
    );

    const handleFafaIcon = useCallback(() => {
        if (isdisplayExpOpen) {
            setdisplayExpClose(false);
            setdisplayExp(2);
        } else {
            setdisplayExpClose(true);
            setdisplayExp(experienceJson.length);
        }
    }, [isdisplayExpOpen, setdisplayExpClose, setdisplayExp]);

    const displayFafaLicense = useCallback(() => {
        if (isdisplaylicenseOpen) {
            setdisplaylicenseOpen(false);
            setdisplaylicense(4);
        } else {
            setdisplaylicenseOpen(true);
            setdisplaylicense(AboutmeLicenses.length);
        }
    }, [isdisplaylicenseOpen, setdisplaylicenseOpen, setdisplaylicense]);
    const redirectLink = useCallback((event) => {
        window.open(event, "_blank");
    }, []);

    const displayProject = useCallback(() => {
        if (isProjectDiv) {
            setisProjectDiv(false);
            setdisProjectDiv(4);
        } else {
            setisProjectDiv(true);
            setdisProjectDiv(AboutmeLicenses.length);
        }
    }, [isProjectDiv, setisProjectDiv, setdisProjectDiv]);
    
    const redirect = (e) => {
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
                <meta property="og:url" content="https://abhijeetkumar-developer.netlify.app/Nextflix/Home" />
                <meta property="og:type" content="website" />
            </Head>
            {" "}
            <div style={{ background: "black", color: "white" }}>
                <div className={Style.NetfixVideoDiv}>
                    <video
                        autoPlay
                        loop
                        muted
                        className={Style.NetfixVideoDiv_video}
                    >
                        <source
                            src="https://cdn.yellowmessenger.com/xE3pHyYCuvLK1692878719722.mp4"
                            type="video/mp4"
                        />
                        Your browser does not support the video tag.
                    </video>
                </div>

                <div className={Style.NetfixAboutMain_div}>
                    <div className={Style.NetfixAboutMain_divOne}>
                        <div className={Style.NetfixAboutMain_divOne_innerDiv}>
                            <div>
                                <h6 className={Style.headingTag}>2023</h6>
                            </div>
                            <div>
                                <h6 className={Style.headingTag}>HD</h6>
                            </div>
                        </div>
                        <div className={Style.NetfixAboutMain_divOne_innerDiv}>
                            <div>
                                <h6 className={Style.headingTag}>#1 in Portfolio </h6>
                            </div>
                            <div>
                                <h6 className={Style.headingTag}>Today</h6>
                            </div>
                        </div>
                        <div>
                            <h4>Episode 1</h4>
                        </div>
                        <div>
                            <p className={`${Style.autoplayText} ${Style.mobileText}`}>
                                The autoplay attribute is a boolean attribute. The autoplay
                                attribute is a boolean attribute.
                            </p>
                        </div>
                    </div>
                    <div className={Style.NetfixAboutMain_divTwo}>
                        <div className={Style.skills_div}>
                            <h4 className={Style.headingTag}>Skills:</h4>
                            <div style={{ display: "flex", flexWrap: "wrap" }}>
                                {AboutmeSkills &&
                                    AboutmeSkills.map((element, i) => (
                                        <p
                                            className={`${Style.skilltext} ${Style.mobileText}`}
                                            key={i}
                                        >
                                            {element.skills}
                                        </p>
                                    ))}
                            </div>
                        </div>
                        <div>
                            <h4 className={Style.headingTag}>Created by: Abhijeet Kumar</h4>
                        </div>
                    </div>
                </div>
                <div className={Style.ExperiencetitleDiv}>
                    <div>
                        <h2 className={Style.heading_netflix_tag}>Experience Episode</h2>
                    </div>
                </div>
                <div className={Style.netflixExpirenceDiv}>
                    {experienceJson.slice(0, displayExp).map((element, i) => (
                        <div className={Style.educationNetflix} key={i}>
                            <div className={Style.netflixExpirenceDiv_Card_one}>
                                <h6>{i + 1}</h6>
                            </div>
                            <div className={Style.netflixExpirenceDiv_Card_one}>
                                <img
                                    src={element.logo}
                                    className={Style.netflixExpirenceDiv_Card_Image}
                                />
                            </div>
                            <div className={Style.netflixExpirenceDiv_Card_three}>
                                <h6 className={Style.netflixExpirenceDiv_Card_three_text}>
                                    {element.desginstion}
                                </h6>
                                <p className={Style.netflixExpirenceDiv_Card_three_Desc}>
                                    {element.jobRole.slice(0, 100)}...
                                </p>
                            </div>
                            <div className={Style.netflixExpirenceDiv_Card_four}>
                                <h6 className={Style.netflixExpirenceDiv_Card_three_timelline}>
                                    {element.timeline}
                                </h6>
                            </div>
                        </div>
                    ))}
                    <div style={{ display: "flex", justifyContent: "center" }}>
                        {isdisplayExpOpen ? (
                            <i
                                className="fa fa-arrow-circle-up fa-2x"
                                aria-hidden="true"
                                onClick={() => handleFafaIcon()}
                            ></i>
                        ) : (
                            <i
                                className="fa fa-arrow-circle-down fa-2x"
                                aria-hidden="true"
                                onClick={() => handleFafaIcon()}
                            ></i>
                        )}
                    </div>
                </div>

                <div>
                    <div className={Style.NextflixMainHeading_div}>
                        <h2 className={Style.heading_netflix_tag}>More like this</h2>
                    </div>
                </div>
                <div className={Style.ProjectMain_div}>
                    {ProjectJson &&
                        ProjectJson.slice(0, disProjectDiv).map((element, i) => (
                            <div className={Style.ProjectMain_div_card} key={i}>
                                <div className={Style.ProjectMain_div_card_image_div}>
                                    <img src={element.image} style={{ width: "100%" }} />
                                </div>
                                <div className={Style.ProjectMain_div_card_fafaIcon}>
                                    <div>2023</div>
                                    <i
                                        className="fa fa-external-link-square"
                                        onClick={() => redirectLink(element.button)}
                                        aria-hidden="true"
                                    ></i>
                                </div>
                                <div className={Style.ProjectMain_div_card_title}>
                                    <h6 style={{ fontSize: "15px" }}>{element.title}</h6>
                                </div>
                                <div className={Style.ProjectMain_div_card_desc_div}>
                                    <h6
                                        className={`${Style.project_div_description} ${Style.mobileText}`}
                                    >
                                        {element.description}
                                    </h6>
                                </div>
                            </div>
                        ))}
                </div>
                {ProjectJson.length > 4 ? (
                    <div style={{ display: "flex", justifyContent: "center" }}>
                        {isProjectDiv ? (
                            <i
                                className="fa fa-arrow-circle-up fa-2x"
                                aria-hidden="true"
                                onClick={() => displayProject()}
                            ></i>
                        ) : (
                            <i
                                className="fa fa-arrow-circle-down fa-2x"
                                aria-hidden="true"
                                onClick={() => displayProject()}
                            ></i>
                        )}
                    </div>
                ) : null}

                <div>
                    <div className={Style.NextflixMainHeading_div}>
                        <h2 className={Style.heading_netflix_tag}>Licenses Trailer</h2>
                    </div>
                </div>
                <div className={Style.AboutmeLicensesMainDiv}>
                    {AboutmeLicenses &&
                        AboutmeLicenses.slice(0, displaylicense).map((element, i) => (
                            <div className={Style.AboutmeLicensesMainDiv_card} key={i}>
                                <div className={Style.AboutmeLicensesMainDiv_card_imageIcon}>
                                    <div>
                                        <img src={element.logo} style={{ width: "10%" }} />
                                    </div>
                                    {islicenseOpen ? (
                                        <i
                                            className="fa fa-folder-open"
                                            onClick={() => handleClickOpen(element.tittle)}
                                            aria-hidden="true"
                                        ></i>
                                    ) : (
                                        <i
                                            className="fa fa-folder faa-horizontal animated "
                                            onClick={() => handleClickOpen(element.tittle)}
                                            aria-hidden="true"
                                        ></i>
                                    )}
                                </div>
                                <div className={Style.AboutmeLicensesMainDiv_card_title}>
                                    <h6 className={Style.AboutmeLicensesMainDiv_card_title_text}>
                                        {element.tittle}
                                    </h6>
                                </div>
                                <div className={Style.AboutmeLicensesMainDiv_card_Desc}>
                                    <h6
                                        className={`${Style.project_div_description} ${Style.mobileText}`}
                                    >
                                        {element.description}
                                    </h6>
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
                                        <Image
                                            src={element.certificate}
                                            onError={() => {
                                                element.certificate = "/Image/aboutPageImage.jpg";
                                            }}
                                            loading='lazy'
                                            style={{ width: '100%', height: '100%', overflow: 'auto' }}
                                            alt={element.tittle}
                                            width={950}
                                            height={550}
                                        ></Image>
                                    </DialogContent>
                                    <DialogActions>
                                        <Button onClick={() => handleClose(element.tittle)}>
                                            Perfect!!!
                                        </Button>
                                    </DialogActions>
                                </Dialog>
                            </div>
                        ))}
                </div>
                <div style={{ display: "flex", justifyContent: "center" }}>
                    {isdisplaylicenseOpen ? (
                        <i
                            className="fa fa-arrow-circle-up fa-2x"
                            aria-hidden="true"
                            onClick={() => displayFafaLicense()}
                        ></i>
                    ) : (
                        <i
                            className="fa fa-arrow-circle-down fa-2x"
                            aria-hidden="true"
                            onClick={() => displayFafaLicense()}
                        ></i>
                    )}
                </div>

                <div>
                    <div className={Style.NextflixMainHeading_div}>
                        <h2>Yellow.ai Hackathon </h2>
                    </div>
                </div>
                <div className={Style.Reward}>
                    <div className={Style.Reward_div}>
                        <div className={Style.Reward_div_title}>Yellow.ai Hackathon : </div>
                        <div className={Style.Reward_div_para}>
                            <p className={`${Style.hackathontext} ${Style.mobileText}`}>
                                I have secured the third position in the yellow.ai Hackathon by
                                proposing an innovative use case for our organization. We came
                                up with an idea to develop a chatbot that would allow
                                restaurants to donate their excess food to nearby non-profit
                                organizations. The bot would collect all the necessary
                                information about the food, owners, and other relevant details
                                to facilitate the process. With the help of my teammates, we
                                were able to achieve this accomplishment, and I am incredibly
                                proud of our efforts.{" "}
                                <a
                                    href="https://www.credential.net/0a51513b-b774-4d73-90d1-75a96b80603e"
                                    target="_blank"
                                    style={{ color: "gray !important " }}
                                >
                                    <strong>View Certificate</strong>
                                </a>
                            </p>
                        </div>
                    </div>
                    <div style={{ padding: "10px" }}></div>
                </div>
                <div style={{ background: "gray", height: "5px" }}></div>
                <div className={Style.MainPageSectionFive}>
                    <div style={{ backgroundColor: 'black',width:'100%' }}>
                        <div className={Style.FooterBar_container}>
                            <div className={Style.FooterBar_container_sectionOne_div_one}>
                                <p className={Style.footer_font_text}>Check out my other Portfolio design</p>
                            </div>
                            <div className={Style.FooterBar_container_sectionOne_div_two}>
                                <div>
                                    <button className={Style.redirect_btn} onClick={() => redirect("/FlipfolioHub/Home")}><p className={Style.footer_font_text}>FlipfolioHub</p></button>
                                </div>
                                <div>
                                    <button className={Style.redirect_btn} onClick={() => redirect("/InstaSpark/Home")}><p className={Style.footer_font_text}>InstaSpark</p></button>
                                </div>
                                <div>
                                    <button className={Style.redirect_btn} onClick={() => redirect("/Introduction")}><p className={Style.footer_font_text}>My Design</p></button>
                                </div>
                                <div>
                                    <button className={Style.redirect_btn} onClick={() => redirect('/Dynamic_Portfolio/Home')}> <p className={Style.footer_font_text}>Dynamic Portfolio(WIP)</p></button>
                                </div>
                            </div>
                        </div>
                        <div className={Style.FooterBar_container_two}>
                            <p className={Style.footer_font_text_other_text}>Handcrafted by Abhijeet kumar @2023</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Main;
