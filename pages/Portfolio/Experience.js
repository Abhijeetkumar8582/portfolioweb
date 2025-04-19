import Style from "/styles/About.module.css"
import * as React from 'react';
import { useEffect } from 'react'
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import Typography from '@mui/material/Typography';
import expItem from '../Json/Expirence.json'
import Head from 'next/head';
import AOS from 'aos';
import Image from 'next/image'
import NavBar from "./NavBar";




function Experience() {
    useEffect(() => {
        AOS.init({ duration: 2000 })
    })
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
            <div data-aos="zoom-in">
                <h1 className={Style.heading} >Where I’ve Worked</h1>
            </div>
            <Timeline position="alternate">

                {expItem.map((element, index) =>

                    index % 2 === 0 ? (

                        <TimelineItem key={index}>

                            <TimelineSeparator key={index}>
                                <TimelineConnector sx={{ bgcolor: 'success.main' }} />
                                <TimelineDot color="success" variant="outlined">
                                    <Image src={element.logo} loading='lazy' alt={element.logo} width={30} height={30} style={{ borderRadius: "20px" }} />
                                </TimelineDot>
                                <TimelineConnector sx={{ bgcolor: 'secondary.main' }} />
                            </TimelineSeparator>
                            <div data-aos="fade-up"
                                data-aos-duration="3000">
                                <div className={Style.box} >

                                    <TimelineContent sx={{ py: '12px', px: 2 }}>

                                        <Typography variant="h6" className={Style.desginstion} component="span">
                                            {element.desginstion}
                                        </Typography>
                                        <h5 className={Style.jobtype}>{element.jobtype}</h5>
                                        <p className={Style.jobtype}>{element.timeline}</p>
                                        <Typography className={Style.jobrole}>{element.jobRole}</Typography>

                                    </TimelineContent>
                                </div>
                            </div>
                        </TimelineItem>)
                        : (

                            <TimelineItem key={index}>
                                <TimelineSeparator>
                                    <TimelineConnector sx={{ bgcolor: 'secondary.main' }} />
                                    <TimelineDot color="primary" variant="outlined">
                                        <Image src={element.logo} loading='lazy' alt={element.logo} width={30} height={30} style={{ borderRadius: "20px" }} />
                                    </TimelineDot>
                                    <TimelineConnector />
                                </TimelineSeparator>
                                <div data-aos="fade-up"
                                    data-aos-duration="3000">
                                    <div className={Style.box} >
                                        <TimelineContent sx={{ py: '12px', px: 2 }}>
                                            <Typography variant="h6" className={Style.desginstion} component="span">
                                                {element.desginstion}
                                            </Typography>
                                            <h5 className={Style.jobtype}>{element.jobtype}</h5>
                                            <p className={Style.jobtype}>{element.timeline}</p>
                                            <Typography className={Style.jobrole}>{element.jobRole}

                                            </Typography>
                                        </TimelineContent>
                                    </div>
                                </div>
                            </TimelineItem>)


                )}
            </Timeline>

        </>
    )
}

export default Experience;

