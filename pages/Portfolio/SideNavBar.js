import GitHubIcon from '@mui/icons-material/GitHub';
import EmailIcon from '@mui/icons-material/Email';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';
import Head from 'next/head';
import { useEffect } from 'react'
import AOS from 'aos';


function SideNavBar() {
  useEffect(() => {
    AOS.init({ duration: 2000 })
  })
  const url = (event) => {
    window.open(event, '_blank');
  };

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

      <div style={{ position: "fixed", zIndex: '1' }}>
        <div data-aos="fade-up">

          <div className='d-flex flex-column' style={{ top: "15%" }} >

            <GitHubIcon sx={{
              width: 30,
              height: 30,
              marginTop: 30,

              marginLeft: 1,
              '&:hover': {
                fill: "#4b68fa",
                transform: "translateY(-5px)"
              },

            }} onClick={() => url("https://github.com/Abhijeetkumar8582")} />


            <EmailIcon sx={{
              width: 30,
              height: 30,
              marginTop: 1,
              marginLeft: 1,
              '&:hover': {
                fill: "#f72500",
                transform: "translateY(-5px)"
              },
            }} onClick={() => url("mailto:abhijeet122kumar@gmail.com")} />


            <LinkedInIcon sx={{
              width: 30,
              height: 30,
              marginTop: 1,
              marginLeft: 1,

              '&:hover': {
                fill: "#0021f7",
                transform: "translateY(-5px)"
              },
            }} onClick={() => url("https://www.linkedin.com/in/abhijeet-kumar-696a5a16a/")} />


            <InstagramIcon sx={{
              width: 30,
              height: 30,
              marginTop: 1,
              marginLeft: 1,
              '&:hover': {
                fill: "#ff4ab7",
                transform: "translateY(-5px)"
              },
            }} onClick={() => url("https://www.instagram.com/daredevil8582/")} />

          </div>

          <div style={{ borderLeft: "2px solid black", marginTop: "5px", marginLeft: "20px", height: "180px" }}></div>
        </div>

      </div>
    </>

  )
}

export default SideNavBar