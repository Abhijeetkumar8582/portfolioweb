import Image from 'next/image'
import SideNavBar from './SideNavBar'
import About from './About'
import Experience from './Experience'
import Project from './Project'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import AOS from 'aos';
import { useRouter } from 'next/router';
import Footer from './Footer'
import NavBar from './NavBar'



function Home() {
  const router = useRouter();

  useEffect(() => {
    AOS.init({ duration: 2000 })
    let getSession = sessionStorage.getItem('Introduction')
    if (getSession == 'Completed') {

    } else {
      router.push('/Introduction')
    }
  }, [])



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


      <SideNavBar />

      <NavBar />

      <div data-aos="fade-up">
        <h1 className=' textfont fontEndText text-center' >
          <strong>Frontend Developer </strong>
        </h1>


        <p className='mainHeading text-center my-4 mx-4' >
          React-ing like there's no tomorrow: How I learned to stop worrying and love the component lifecycle!
        </p>
        <div className='d-flex justify-content-center'>
          <Image src="/mainPage.webp" alt="Picture of the Coder" priority={false} loading='lazy' width={350} height={350} />
        </div>
      </div>
      <div style={{ marginTop: "11%" }}></div>

      <About />


      <Experience />

      <div style={{ marginTop: "11%" }}></div>

      <Project />

      <Head>
        <title> ABHI | Home</title>

        {/* <!-- Meta tags for Facebook --> */}
        <meta property="og:title" content="ABHI | Home" />
        <meta name="description" content="As a passionate frontend developer, I am always eager to explore the latest technologies and stay ahead of the curve. With a deep understanding of the frontend" />
        <meta property="og:description" content="As a passionate frontend developer, I am always eager to explore the latest technologies and stay ahead of the curve. With a deep understanding of the frontend" />
        <meta property="og:image" content="/mainPage.webp" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="628" />
        <meta property="og:url" content="https://abhijeet-kumar-dev.netlify.app/Portfolio/Home" />
        <meta property="og:type" content="https://abhijeet-kumar-dev.netlify.app/Portfolio/Home" />
        <meta property="og:site_name" content="ABHI" />

        {/* <!-- Meta tags for WhatsApp --> */}
        <meta property="og:title" content="ABHI | Home" />
        <meta name="description" content="As a passionate frontend developer, I am always eager to explore the latest technologies and stay ahead of the curve. With a deep understanding of the frontend" />
        <meta property="og:description" content="As a passionate frontend developer, I am always eager to explore the latest technologies and stay ahead of the curve. With a deep understanding of the frontend" />
        <meta property="og:image" content="/mainPage.webp" />
        <meta property="og:image:width" content="1920" />
        <meta property="og:image:height" content="1080" />
        <meta property="og:url" content="https://abhijeet-kumar-dev.netlify.app/Portfolio/Home" />
        <meta property="og:type" content="https://abhijeet-kumar-dev.netlify.app/Portfolio/Home" />
        <meta property="og:site_name" content="ABHI" />

        {/* <!-- Meta tags for LinkedIn --> */}
        <meta property="og:title" content="ABHI | Home" />
        <meta name="description" content="As a passionate frontend developer, I am always eager to explore the latest technologies and stay ahead of the curve. With a deep understanding of the frontend" />
        <meta property="og:description" content="As a passionate frontend developer, I am always eager to explore the latest technologies and stay ahead of the curve. With a deep understanding of the frontend" />
        <meta property="og:image" content="/mainPage.webp" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="628" />
        <meta property="og:url" content="https://abhijeet-kumar-dev.netlify.app/Portfolio/Home" />
        <meta property="og:type" content="https://abhijeet-kumar-dev.netlify.app/Portfolio/Home" />
        <meta property="og:site_name" content="ABHI" />

        {/* <!-- Meta tags for Instagram --> */}
        <meta property="og:title" content="ABHI | Home" />
        <meta name="description" content="As a passionate frontend developer, I am always eager to explore the latest technologies and stay ahead of the curve. With a deep understanding of the frontend" />
        <meta property="og:description" content="As a passionate frontend developer, I am always eager to explore the latest technologies and stay ahead of the curve. With a deep understanding of the frontend" />
        <meta property="og:image" content="/mainPage.webp" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="628" />
        <meta property="og:url" content="https://abhijeet-kumar-dev.netlify.app/Portfolio/Home" />
        <meta property="og:type" content="https://abhijeet-kumar-dev.netlify.app/Portfolio/Home" />
        <meta property="og:site_name" content="ABHI" />
      </Head>

      <Footer />
    </>
  )

}


export default Home;