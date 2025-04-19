import React, { useState, useCallback, useEffect } from "react";
import Style from "styles/Instagram.module.css";
import Avatar from "@mui/material/Avatar";
import AboutmeSkills from "../Json/AboutmeSkills.json";
import AboutmeLicenses from "../Json/AboutmeLicenses.json";
import AboutmeProject from '../Json/Projects.json';
import AboutmeExpirence from '../Json/Expirence.json';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import Image from "next/image";
import { useRouter } from "next/router";
import Head from "next/head";
import Link from "next/link";
import DialogTitle from '@mui/material/DialogTitle';
import DialogContentText from '@mui/material/DialogContentText';
import GitHubIcon from '@mui/icons-material/GitHub';
import EmailIcon from '@mui/icons-material/Email';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';




function Home() {
  const router = useRouter();
  const [prevbuttonIndex, setprevbuttonIndex] = useState(0);
  const initialNextbuttonIndex = AboutmeSkills.length >= 10 ? 9 : AboutmeSkills.length;
  const indexAdd = AboutmeSkills.length % 2 == 0 ? 2 : 1;
  const [getIndexValue, setIndexValue] = useState(indexAdd)

  const [nextbuttonIndex, setnextbuttonIndex] = useState(initialNextbuttonIndex);

  const prevbutton = () => {
    if (prevbuttonIndex !== 0) {
      setprevbuttonIndex(prevbuttonIndex - getIndexValue);
      setnextbuttonIndex(nextbuttonIndex - getIndexValue);
    }
  };

  const nextbutton = () => {

    if (nextbuttonIndex !== AboutmeSkills.length) {
      setprevbuttonIndex(prevbuttonIndex + getIndexValue);
      setnextbuttonIndex(nextbuttonIndex + getIndexValue);
    }
  };

  const [value, setValue] = React.useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const SideNavBar_array = [
    {
      fafa: "fa fa-home fa-1x",
      title: "Home",
    },
    {
      fafa: "fa fa-search fa-1x",
      title: "Search",
    },
    {
      fafa: "fa fa-compass fa-1x",
      title: "Explore",
    },
    {
      fafa: "fa fa-commenting fa-1x",
      title: "Messages",
    },
    {
      fafa: "fa fa-bell fa-1x",
      title: "Notifications",
    },
    {
      fafa: "fa fa-user fa-1x",
      title: "Profile",
    },
  ];
  const [profileavatarSize, setprofileavatarSize] = useState(150)
  const [skillAvatar, setskillAvatar] = useState(70)
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

  const handleClick = (event) => {
    window.open(event, '_blank');
  }

  const [screenDimensions, setScreenDimensions] = useState({
    screenWidth: 0,
    screenHeight: 0,
  });

  const handleResize = useCallback(() => {
    setScreenDimensions({
      screenWidth: window.innerWidth,
      screenHeight: window.innerHeight,
    });
  }, [setScreenDimensions]);

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

  useEffect(() => {

    if (screenDimensions.screenWidth < 583) {
      setnextbuttonIndex(4)
      setskillAvatar(40)
      setprofileavatarSize(50)
    }
    else if (screenDimensions.screenWidth > 583 && screenDimensions.screenWidth < 768) {
      setnextbuttonIndex(6)
      setprofileavatarSize(50)
      setskillAvatar(40)
    }
    else if (screenDimensions.screenWidth < 769) {
      setprofileavatarSize(50)
      setskillAvatar(40)
      setnextbuttonIndex(7)
    } else if (screenDimensions.screenWidth > 769 && screenDimensions.screenWidth < 1080) {
      setprofileavatarSize(80)
      setskillAvatar(50)
      setnextbuttonIndex(7)
    }
    else if (screenDimensions.screenWidth > 1080 && screenDimensions.screenWidth < 1250) {
      setprofileavatarSize(90)
      setskillAvatar(60)
      setnextbuttonIndex(8)
    }
    else {
      setprofileavatarSize(150)
      setskillAvatar(70)
      setnextbuttonIndex(8)
    }
  }, [screenDimensions.screenWidth, skillAvatar, profileavatarSize]);
  const redirect = () => {
    router.push("/");
  }
  const [openAchievement, setAchievement] = React.useState(false);

  const handleClickOpenAchievement = () => {
    setAchievement(true);
  };

  const handleCloseAchievemnet = () => {
    setAchievement(false);
  };
  const [openContact, setContact] = React.useState(false);

  const handleClickOpenContact = () => {
    setContact(true);
  };

  const handleCloseContact = () => {
    setContact(false);
  };
  const url = (event) => {
    window.open(event, '_blank');
  };
  const redirect_user = (e) => {
    router.push(e) 
}
  return (
    <>

      <Head>
        <title>InstaSpark - Abhijeet</title>
        <meta property="og:title" content="InstaSpark - Abhijeet" />
        <meta property="og:description" content="Discover Abhijeet's Instagram UI portfolio—an immersive world of creative design inspired by Netflix. Dive into captivating user experiences and join me on my design journey!" />
        <meta property="og:image" content="/Image/Instagram_UI.webp" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="628" />
        <meta property="og:url" content="https://abhijeetkumar-developer.netlify.app/VisionStream/Home" />
        <meta property="og:type" content="website" />
      </Head>


      <div className={Style.Instragram_Main_Div}>
        <div className={Style.Instragram_Div_Side_NavBar}>
          <div className={Style.Instragram_Div_Side_NavBar_heading}>
            <Link href={"/"} className={Style.LinkWithoutUnderline}>
              <div >
                <h3 className={Style.Instragram_Div_Side_NavBar_instagram_title}>InstaSpark</h3>
                <i
                  className={`${"fa fa-instagram"} ${Style.Instragram_Div_Side_NavBar_instagram_icon}`}
                  aria-hidden="true"
                ></i>
              </div>
            </Link>
            <div className={Style.Instragram_Div_Side_NavBar_subHeading}>
              {SideNavBar_array.map((element, i) => (
                <div
                  className={Style.Instragram_Div_Side_NavBar_subHeading_list}
                  key={i}
                >
                  <i className={`${element.fafa} ${Style.fafaIcon}`} aria-hidden="true"></i>
                  <div className={Style.Instragram_Div_Side_NavBar_heading_title_div}>
                    <h5 className={Style.Instragram_Div_Side_NavBar_heading_title}>{element.title}</h5>
                  </div>
                </div>
              ))}
            </div>

            <div className={Style.Instragram_Div_Side_NavBar_Menu_title}>
              <i className={`${"fa fa-bars"} ${Style.Instragram_Div_Side_NavBar_Menu_icon}`} aria-hidden="true"></i>
              <div className={Style.Instragram_Div_Side_NavBar_instagram_menu_Section_div}>
                <h6 className={Style.Instragram_Div_Side_NavBar_instagram_menu_Section}>Menu</h6>
              </div>
            </div>
          </div>
        </div>

        <div className={Style.Instragram_Content_Main_div}>
          <div className={Style.Moblie_Navbar_Div}>
            <div className={Style.Moblie_Navbar_Div_lock_fa_fa_icon}>
              <i className="fa fa-lock" style={{ fontSize: '16px' }} aria-hidden="true"></i>
              <div>
                <button aria-label="Daredevil8582" onClick={() => redirect()} className={Style.daredevil8582_btn}>
                  <h6 className={Style.Moblie_daredevil8582_text}>daredevil8582</h6>
                </button></div>
              <i className="fa fa-angle-down" style={{ fontSize: '16px' }} aria-hidden="true"></i>
            </div>
            <div>
              <i className="fa fa-bars" style={{ fontSize: '16px' }} aria-hidden="true"></i>
            </div>
          </div>
          <div className={Style.Instragram_Content_Intro_section}>
            <div className={Style.Instragram_Intro_section_image}>
              <Avatar
                alt="Abhijeet kumar"
                priority={true}
                src="/Image/Abhijeet_kumar_insta_img.webp"
                sx={{ width: profileavatarSize, height: profileavatarSize }}

              />
            </div>
            <div className={Style.Instragram_Content_username_Section_Main_div}>
              <div className={Style.Instragram_Content_username_Section}>
                <div className={Style.daredevil8582_text_div}>
                  <h5 className={Style.daredevil8582_text}>daredevil8582</h5>
                </div>
                <div>

                  <button aria-label="Contact" onClick={handleClickOpenContact} className={Style.edit_profile_button}>Contact</button>
                  <Dialog
                    open={openContact}
                    onClose={handleCloseContact}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                  >
                    <DialogTitle id="alert-dialog-title">
                      <p className={Style.mobile_text}>Let's establish a professional connection 👔</p>
                    </DialogTitle>
                    <DialogContent>
                      <DialogContentText id="alert-dialog-description">
                        <div className='' style={{ display: 'flex', gap: '5px', minHeight: '50px', justifyContent: 'center' }} >

                          <GitHubIcon sx={{
                            width: 30, height: 30, marginTop: 1, marginLeft: 1, color: '#2b2b2b',
                            '&:hover': { fill: "black", transform: "translateY(-5px)" },
                          }} onClick={() => url("https://github.com/Abhijeetkumar8582")} />

                          <EmailIcon sx={{
                            width: 30, height: 30, marginTop: 1, marginLeft: 1, color: '#ff5454',
                            '&:hover': { fill: "#f72500", transform: "translateY(-5px)" },
                          }} onClick={() => url("mailto:abhijeet122kumar@gmail.com")} />

                          <LinkedInIcon sx={{
                            width: 30, height: 30, marginTop: 1, marginLeft: 1, color: '#5e69ff',
                            '&:hover': { fill: "#0021f7", transform: "translateY(-5px)" },
                          }} onClick={() => url("https://www.linkedin.com/in/abhijeet-kumar-696a5a16a/")} />

                          <InstagramIcon sx={{
                            width: 30, height: 30, marginTop: 1, marginLeft: 1, color: '#ff8754',
                            '&:hover': { fill: "#ff4ab7", transform: "translateY(-5px)" },
                          }} onClick={() => url("https://www.instagram.com/daredevil8582/")} />

                        </div>
                      </DialogContentText>
                    </DialogContent>
                  </Dialog>
                </div>

                <div>
                  <button aria-label="Achievements" onClick={handleClickOpenAchievement} className={Style.edit_profile_button}>Achievements</button>
                  <Dialog
                    open={openAchievement}
                    onClose={handleCloseAchievemnet}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                  >
                    <DialogTitle id="alert-dialog-title">
                      {"Yellow.ai Hackathon"}
                    </DialogTitle>
                    <DialogContent>
                      <DialogContentText id="alert-dialog-description">
                        <p className={Style.mobile_text}>I secured the third position in the yellow.ai Hackathon by proposing an innovative idea: creating a chatbot to help restaurants donate excess food to nearby non-profit organizations. With the support of my teammates, we successfully implemented this idea, and I am immensely proud of our achievement. <a href="https://www.credential.net/0a51513b-b774-4d73-90d1-75a96b80603e" target="_blank" style={{ color: "tomato !important " }}><strong>View Certificate</strong></a></p>

                      </DialogContentText>
                    </DialogContent>
                  </Dialog>

                </div>
                <div className={Style.Setting_edit_profile_button}>
                  <i className="fa fa-cog fa-1x" style={{ fontSize: '25px' }} aria-hidden="true"></i>
                </div>
              </div>
              <div className={Style.Instragram_Content_Post_Section}>
                <div className={Style.Instragram_Content_Post_Section_subdiv}>
                  <div>
                    <h6 className={Style.mobile_text}>{AboutmeSkills.length}</h6>
                  </div>
                  <div>
                    <h6 className={Style.mobile_text}>Skills</h6>
                  </div>
                </div>
                <div>
                  <div className={Style.Instragram_Content_Post_Section_subdiv}>
                    <div>
                      <h6 className={Style.mobile_text}>{AboutmeLicenses.length}</h6>
                    </div>
                    <div>
                      <h6 className={Style.mobile_text}>Certifications</h6>
                    </div>
                  </div>
                </div>
                <div>
                  <div className={Style.Instragram_Content_Post_Section_subdiv}>
                    <div>
                      <h6 className={Style.mobile_text}>{AboutmeProject.length}</h6>
                    </div>
                    <div>
                      <h6 className={Style.mobile_text}>Projects</h6>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <h6 className={`${Style.mobile_text} ${Style.abhijeetkumarText}`}>Abhijeet kumar</h6>
              </div>
              <div className={Style.Instagram_status}>
                <h6 className={Style.mobile_text}>Coding enthusiast 🚀 | Constantly learning and evolving 💡 | Turning pixels into beautiful experiences ✨</h6 > #FrontendDevLife #CodePassion #AlwaysLearning  </div>
            </div>
          </div>
          <div className={Style.mobileRenderBtn}>
            <div className={Style.mobile_profile_button_div}>
              <button aria-label="Contact_details" onClick={handleClickOpenContact} className={Style.mobile_profile_button}>Contact</button>
            </div>
            <div className={Style.mobile_profile_button_div}>
              <button aria-label="mobile_profile_button_view archieve" onClick={handleClickOpenAchievement} className={Style.mobile_profile_button}>Achievements</button>
            </div>
          </div>



          <div className={Style.Instragram_Content_Skills_div_container}>
            <div className={Style.Instragram_Content_Skills_div_arrow_left}>
              {prevbuttonIndex === 0 ? (<button aria-label="prevbutton_diabled" disabled className={Style.nextbutton} onClick={nextbutton}>
                <i
                  className="fa fa-arrow-circle-left"
                  style={{ color: 'black' }}
                  aria-hidden="true"
                ></i>
              </button>) : (
                <button aria-label="prevbutton" className={Style.prevbutton} onClick={prevbutton}>
                  <i className="fa fa-arrow-circle-left" aria-hidden="true"></i>
                </button>
              )}
            </div>
            <div className={Style.Instragram_Content_Skills_div}>
              {AboutmeSkills.slice(prevbuttonIndex, nextbuttonIndex).map(
                (element, i) => (
                  <div
                    className={Style.Instragram_Content_Skills_avatar}
                    key={i}
                  >
                    <Avatar
                      alt={element.skills}
                      src={element.logo}
                      style={{ border: '1px solid gray', padding: '3px', maxWidth: '80px' }}
                      sx={{ width: skillAvatar, height: skillAvatar }}
                    />
                    <h6>{element.skills}</h6>
                  </div>
                )
              )}
              {nextbuttonIndex >= AboutmeSkills.length ? (<div className={Style.Instragram_Content_Skills_avatar} >
                <Avatar
                  alt="Add Skills"
                  src="/Image/AddNewSkills.webp"
                  style={{ border: '1px solid gray', padding: '3px' }}
                  sx={{ width: skillAvatar, height: skillAvatar }}
                />
                <h6>Add skills</h6>
              </div>) : null}

            </div>
            <div className={Style.Instragram_Content_Skills_div_arrow_left}>
              {nextbuttonIndex > AboutmeSkills.length + getIndexValue + 1 || nextbuttonIndex == AboutmeSkills.length ? (<button aria-label="disabled_btn" disabled className={Style.nextbutton} onClick={nextbutton}>
                <i
                  className="fa fa-arrow-circle-right"
                  style={{ color: 'black' }}
                  aria-hidden="true"
                ></i>
              </button>) : (
                <button aria-label="nextbutton" className={Style.nextbutton} onClick={nextbutton}>
                  <i
                    className="fa fa-arrow-circle-right"
                    aria-hidden="true"
                  ></i>
                </button>
              )}
            </div>


          </div>

          <div className={Style.Instragram_Content_Major_div}>
            <Box sx={{ width: '100%', typography: 'body1' }}>
              <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }} style={{ display: 'flex', justifyContent: 'center' }}>
                  <TabList onChange={handleChange} textColor="inherit"
                    indicatorColor="none" aria-label="lab API tabs example">
                    <Tab className={Style.Instragram_Content_Major_div_item} label={<div style={{ display: 'flex', gap: '5px', alignItems: 'center' }}><i className="fa fa-tasks" aria-hidden="true"></i>{' Projects'}</div>} value="1" style={{ color: 'white' }} />
                    <Tab className={Style.Instragram_Content_Major_div_item} label={<div style={{ display: 'flex', gap: '5px', alignItems: 'center' }}><i className="fa fa-align-justify" aria-hidden="true"></i>{' Experience'}</div>} value="2" />
                    <Tab className={Style.Instragram_Content_Major_div_item} label={<div style={{ display: 'flex', gap: '5px', alignItems: 'center' }}><i className="fa fa-certificate" aria-hidden="true"></i>{' Certifications'}</div>} value="3" />
                  </TabList>
                </Box>
                <TabPanel value="1">
                  <div className={Style.expirence_Product_card_list} >
                    {AboutmeProject.map((element, i) => (
                      <div className={Style.expirence_card} key={i}>
                        <div className={Style.expirence_card_image}>
                          <img src={element.image} alt={element.image} style={{ width: '100%', maxWidth: '300px' }} />
                        </div>
                        <p className={Style.expirence_card_title}>{element.title}</p>
                        <p className={Style.expirence_card_body}>
                          {element.description}       </p>
                        <p className={Style.expirence_card_footer}>{element.code}</p>
                        <button aria-label={`viewProject_btn${i}`} className={Style.viewProject_btn} onClick={() => handleClick(element.button)} > view</button>
                      </div>
                    ))}

                  </div>
                </TabPanel>


                <TabPanel value="2">
                  <div className={Style.expirence_card_list}>
                    {AboutmeExpirence.map((element, i) => (
                      <div className={Style.card} key={i}>
                        <div className={Style.header}>
                          <div>
                            <h4 className={Style.title}>
                              {element.desginstion}
                            </h4>
                            <p className={Style.name}>{element.jobtype}</p>
                            <p className={Style.name}>{element.timeline}</p>
                          </div>
                          <span className={Style.image}>
                            <img style={{ width: '100%' }} src={element.logo} />
                          </span>
                        </div>
                        <p className={Style.description}>
                          {element.jobRole}
                        </p>
                      </div>
                    ))}

                  </div>
                </TabPanel>

                <TabPanel value="3">
                  <div className={Style.AboutmeLicenses_Main_div} >
                    {AboutmeLicenses.map((element, i) => (
                      <div className={Style.AboutmeLicenses_div} key={i}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                          <p className={Style.AboutmeLicenses_div_heading}>{element.tittle}</p>
                          <Avatar alt={element.logo} src={element.logo} />
                        </div>
                        <p className={Style.AboutmeLicenses_div_description}>{element.description}</p>
                        <button aria-label={`AboutmeLicenses_div_button${i}`} className={Style.AboutmeLicenses_div_button} onClick={() => handleClickOpen(element.tittle)}>View Certificate</button>

                        <Dialog
                          disablePortal
                          sx={{ width: "100%", background: 'black' }}
                          open={open[element.tittle] || false}
                          onClose={() => handleClose(element.tittle)}
                          maxWidth="xl"
                        >
                          <DialogContent>
                            <div className={Style.DialogContent_box} >
                              <div className={Style.DialogContent_box_image} >
                                <Image src={element.certificate} onError={() => { element.certificate = "/Image/aboutPageImage.jpg" }} priority style={{ width: '100%', height: '100%' }} alt={element.tittle} width={950} height={550}></Image>
                              </div>
                              <div className={Style.DialogContent_box_content} >
                                <div className={Style.DialogContent_box_Avatar_div}>
                                  <Avatar
                                    alt="Abhijeet_kumar_insta_img"
                                    src="/Image/Abhijeet_kumar_insta_img.webp"
                                    sx={{ width: 50, height: 50 }}

                                  />
                                  <h6 className={Style.mobile_text} >daredevil8582</h6>

                                </div>
                                <div>
                                  <h5 className={Style.mobile_text}>{element.tittle}</h5>
                                  <p className={Style.mobile_text}>{element.description}</p>
                                </div>
                                <div>
                                  <Button onClick={() => handleClose(element.tittle)}>Perfect!!!</Button>

                                </div>
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>
                      </div>
                    ))}
                  </div>
                </TabPanel>
              </TabContext>
            </Box>

          </div>
          <div className={Style.Crafted_text_div}>
            <div style={{ backgroundColor: 'black', width: '100%' }}>
              <div className={Style.FooterBar_container}>
                <div className={Style.FooterBar_container_sectionOne_div_one}>
                  <p className={Style.footer_font_text}>Check out my other Portfolio design</p>
                </div>
                <div className={Style.FooterBar_container_sectionOne_div_two}>
                  <div>
                    <button aria-label="FlipfolioHub" className={Style.redirect_btn} onClick={() => sessionStorage.getItem("UserName")?redirect_user("/FlipfolioHub/MainPage"):redirect_user("/FlipfolioHub/Home")}><p className={Style.footer_font_text}>FlipfolioHub</p></button>
                  </div>
                  <div>
                    <button aria-label="VisionStream" className={Style.redirect_btn} onClick={() => redirect_user("/VisionStream/Home")}><p className={Style.footer_font_text}>VisionStream</p></button>
                  </div>
                  <div>
                    <button aria-label="Introduction" className={Style.redirect_btn} onClick={() => redirect_user("/Introduction")}><p className={Style.footer_font_text}>My Design</p></button>
                  </div>
                  <div>
                    <button aria-label="Dynamic_Portfolio" className={Style.redirect_btn} onClick={() => redirect_user('/Dynamic_Portfolio/Home')}> <p className={Style.footer_font_text}>Dynamic Portfolio(WIP)</p></button>
                  </div>
                  
                </div>
              </div>
              <div className={Style.FooterBar_container_two}>
                <p className={Style.footer_font_text_other_text}>Handcrafted by Abhijeet kumar @2023</p>
              </div>

            </div> </div>
        </div>

      </div>
    </>
  );
}

export default Home;
