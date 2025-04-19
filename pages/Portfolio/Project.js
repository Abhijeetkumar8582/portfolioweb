import { useEffect } from 'react'
import projects from '../Json/Projects.json'
import Head from 'next/head';
import AOS from 'aos';
import Image from 'next/image'

import NavBar from './NavBar';




function Project() {
    useEffect(() => {
        AOS.init({ duration: 2000 })
    })
    const handleClick = (event) => {
        window.open(event, '_blank');
    }
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
                <h1 className='heading'>Some Things I’ve Built</h1>
            </div>
            <div className='' style={{display:'flex',overflowX:'scroll',gap:'20px',margin:'0rem 1rem'}}>
                {projects.map((element, index) => (
                    <div className='' key={index}>
                        <div data-aos="zoom-in-up">
                            <div className="Project_card">
                                <div className="Project_card_header">
                                    <Image
                                        component="img"
                                        style={{ width: '100%', borderRadius: '0px' }}
                                        src={element.image}
                                        width={400}
                                        loading='lazy'
                                        height={100}
                                        alt={element.image}
                                    /></div>
                                <div className="Project_card_info">
                                    <p className="Project_card_title">{element.title}</p>
                                    <p className='product_description'> {element.description}</p>
                                </div>
                                <div className="Project_card_footer">
                                    <p className="Project_card_tag">#{element.code} </p>
                                    <button type="button" aria-label={`View Project${index}`} onClick={() => handleClick(element.button)} className="action">View Project </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

        </>
    )
}

export default Project