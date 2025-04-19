import React, { useCallback } from "react";
import Style from "/styles/FlipfolioHub.module.css";
import Head from 'next/head';
import { useRouter } from "next/router";
function Footer() {
    const router = useRouter()
    const url = useCallback((event) => {
        window.open(event, "_blank");
    });
    const redirect_user = (e) => {
        router.push(e) 
    }
    return (
        <><Head>
            <title>FlipfolioHub - Abhijeet</title>
        </Head>

            <div style={{ backgroundColor: '#2874f0' }}>
                <div className={Style.FooterBar_container}>
                    <div className={Style.FooterBar_container_sectionOne_div_one}>
                        <p className={Style.footer_font_text}>Check out my other Portfolio design</p>
                    </div>
                    <div className={Style.FooterBar_container_sectionOne_div_two}>
                        <div>
                            <button aria-label="Nextflix" className={Style.redirect_btn} onClick={() => redirect_user("/VisionStream/Home")}><p className={Style.footer_font_text}>VisionStream</p></button>
                        </div>
                        <div>
                            <button aria-label="InstaSpark" className={Style.redirect_btn} onClick={() => redirect_user("/InstaSpark/Home")}><p className={Style.footer_font_text}>InstaSpark</p></button>
                        </div>
                        <div>
                            <button aria-label="Introduction" className={Style.redirect_btn} onClick={() => redirect_user("/Introduction")}><p className={Style.footer_font_text}>My Design</p></button>
                        </div>
                        <div>
                            <button aria-label="Dynamic_Portfolio" className={Style.redirect_btn} onClick={() => redirect_user('/Dynamic_Portfolio/Home')}> <p className={Style.footer_font_text}>Dynamic Portfolio(WIP)</p></button>
                        </div>
                    </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'black',marginTop:'5px' ,flexWrap:'wrap'}}>
                    <div
                        className={Style.fafaicongithub}
                        onClick={() => url("https://github.com/Abhijeetkumar8582")}
                    >
                        <i className="fa fa-github" aria-hidden="true" ></i> <p className={Style.footer_font_text} style={{ margin: '0' }}>Github</p>
                    </div>
                    <div
                        className={Style.fafaiconemail}
                        onClick={() => url("mailto:abhijeet122kumar@gmail.com")}
                    >
                        <i className="fa fa-envelope" aria-hidden="true" ></i> <p className={Style.footer_font_text} style={{ margin: '0' }}>Email</p>
                    </div>
                    <div
                        className={Style.fafaiconLinkedin}
                        onClick={() =>
                            url("https://www.linkedin.com/in/abhijeet-kumar-696a5a16a/")
                        }
                    >
                        <div><i className="fa fa-linkedin-square" aria-hidden="true" ></i></div>
                        <div> <p className={Style.footer_font_text} style={{  margin: '0' }}>linkedIn</p></div>
                    </div>
                    <div
                        className={Style.fafaiconinstagram}
                        onClick={() => url("https://www.instagram.com/daredevil8582/")}
                    >
                        <i className="fa fa-instagram" aria-hidden="true" ></i> <p className={Style.footer_font_text} style={{ margin: '0' }}>Instagram</p>
                    </div>
                    {/* </nav> */}
                </div>
                <div className={Style.FooterBar_container_two}>

                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <p className={Style.footer_font_text_other_text}>Handcrafted by Abhijeet kumar @2023</p>
                    </div>

                </div>
            </div>
        </>
    );
}

export default Footer;
