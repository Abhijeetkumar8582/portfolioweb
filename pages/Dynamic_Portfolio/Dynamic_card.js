import React, { useState, useCallback } from 'react'
import Style from "../../styles/Dynamic.module.css";
import Image from 'next/image';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

export function DynamicCard({ item, index }) {


  return (
    <div style={{ display: "flex", flexDirection: "row", gap: "10px", alignItems: "center", justifyContent: "center", flexWrap: "wrap" }} key={index}>
      <div className={Style.Dynamic_Card_one} draggable="true">
        <div style={{width:"100%",height:"120px",borderRadius:"10px"}}><img src={item.image} alt="Project_Image" width="100%" height="120px" /></div>
        
        <h5>{item.title}</h5>
        <p style={{ fontSize: "12px", color: "#808080" }}>{item.description}</p>
        <h6 style={{ fontSize: "12px", color: "#808080" }}>{item.code}</h6>
        <button onClick={() => window.open(item.button, '_blank')} style={{ backgroundColor: "#000", color: "#fff", padding: "5px 10px", borderRadius: "5px", cursor: "pointer", fontSize: "12px" }}>View Project</button>
      </div>
    </div>
  )
}

export function ExpirenceCard({ item, index }) {
  return (
    <div className={Style.Expirence_Card} key={index}>
      <div className={Style.Expirence_icon}>
        <img src={item.logo} alt="Expirence_Image" width="20px" height="20px" />
      </div>
      <div className={Style.Expirence_content}>
        <span className={Style.Expirence_title}>{item.desginstion} - {item.jobtype}</span>
        <div className={Style.Expirence_desc}>{item.jobRole}</div>
        <div className={Style.Expirence_desc}>{item.timeline}</div>
        <div className={Style.Expirence_actions}>
        </div>
      </div>
    </div>
  )
}

export function Skillcard({ item, index }) {
  return (
    <div className={Style.Skill_Div}>
      <div className={Style.Skill_Div_One}>
        <img src={item.logo} alt="Skill_Image" width="50px" height="50px" />
        <h6>{item.skills}</h6>
        {/* <img src={item.logo} alt="Skill_Image" width="20px" height="20px" /> */}
      </div>
    </div>
  )
}

export function Licensecard({ item, index }) {
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
    <div className={Style.Expirence_Card}>
      <div className={Style.Expirence_icon}>
        <img src={item.logo} alt="Expirence_Image" width="50px" height="50px" />
      </div>
      <div className={Style.Expirence_content}>
        <span className={Style.Expirence_title}>{item.tittle}</span>
        <div className={Style.Expirence_desc}>{item.description}</div>
        <div className={Style.Expirence_actions}>
          <button className='action' aria-label="Certificate" onClick={() => handleClickOpen(item.tittle)}>
            Certificate
          </button>
        </div>
      </div>
      <Dialog
        disablePortal
        sx={{ width: "100%" }}
        open={open[item.tittle] || false}
        onClose={() => handleClose(item.tittle)}
        maxWidth="xl"
      >
        <DialogTitle>{item.tittle}</DialogTitle>
        <DialogContent>
          <Image src={item.certificate} onError={() => { item.certificate = "/Image/aboutPageImage.jpg" }} loading='lazy' alt={item.tittle} width={950} height={550}></Image>
        </DialogContent>
        <DialogActions>
          <Button style={{ backgroundColor: "rgb(23 87 139)", color: "#fff" }} onClick={() => handleClose(item.tittle)}>Perfect!!!</Button>
        </DialogActions>
      </Dialog>
    </div>


  )

}
export function Textcard({ item, index }) {
  return (
    <div >
       <textarea 
            placeholder="How can I help you? Would you like to know more about me?" 
            className={Style.input} 
            name="text"
          ></textarea>
    </div>
  )
}


export function MainCard({ item, index }) {
  return (
    <div className={Style.Expirence_Card_Main_card} key={index}>
      <div className={Style.Expirence_icon}>
        <img src={item.logo} alt="Expirence_Image" width="20px" height="20px" />
      </div>
      <div className={Style.Expirence_content}>
        <span className={Style.Expirence_title}>{item.desginstion} - {item.jobtype}</span>
        <div className={Style.Expirence_desc}>{item.jobRole}</div>
        <div className={Style.Expirence_desc}>{item.timeline}</div>
        <div className={Style.Expirence_actions}>
        </div>
      </div>
    </div>
  )
}
export function ProjectCardMainCard({ item, index }) {


  return (
    <div style={{ display: "flex", flexDirection: "row", gap: "10px", alignItems: "center", justifyContent: "center", flexWrap: "wrap" }} key={index}>
      <div className={Style.Dynamic_Card_one_main_card} draggable="true">
        <div style={{width:"100%",height:"120px",borderRadius:"10px"}}><img src={item.image} alt="Project_Image" width="100%" height="120px" /></div>
        
        <h5>{item.title}</h5>
        <p style={{ fontSize: "12px", color: "#808080" }}>{item.description}</p>
        <h6 style={{ fontSize: "12px", color: "#808080" }}>{item.code}</h6>
        <button onClick={() => window.open(item.button, '_blank')} style={{ backgroundColor: "#000", color: "#fff", padding: "5px 10px", borderRadius: "5px", cursor: "pointer", fontSize: "12px" }}>View Project</button>
      </div>
    </div>
  )
}

export function SkillcardMainCard({ item, index }) {
  return (
    <div className={Style.Skill_Div_Main_card}>
      <div className={Style.Skill_Div_One_Main_card}>
        <img src={item.logo} alt="Skill_Image" width="20px" height="20px" />
        <h6 style={{color:"white"}}>{item.skills}</h6>
      
      </div>
    </div>
  )
}

export function LoadingDivMainCard({ item, index }) {
  return (

    <div className={Style.LoadingDivcards}>
  <div className={`${Style.LoadingDivcard} ${Style.isLoading}`}>
    <div className={Style.LoadingDivimage}></div>
    <div className={Style.LoadingDivcontent}>
      <h2></h2>
      <p></p>
    </div>
  </div>
</div>
 
  )
}