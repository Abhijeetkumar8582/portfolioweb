import React from 'react';
import { useRouter } from 'next/router';

function Footer() {
  const router = useRouter();
  const redirect = (e) => {
    router.push(e)
  }
  return (
    <div style={{ backgroundColor: '#FDA260' }}>
      <div className='FooterBar_container'>
        <div className='FooterBar_container_sectionOne_div_one'>
          <p className='footer-font_text'>Check out my other Portfolio design</p>
        </div>
        <div className='FooterBar_container_sectionOne_div_two'>
          <div>
            <button className='redirect_btn'  aria-label="FlipfolioHub" onClick={()=>sessionStorage.getItem("UserName")?redirect("/FlipfolioHub/MainPage"):redirect("/FlipfolioHub/Home")}><p className='footer-font_text'>FlipfolioHub</p></button>
          </div>
          <div>
            <button className='redirect_btn'  aria-label="VisionStream" onClick={()=>redirect("/VisionStream/Home")}><p className='footer-font_text'>VisionStream</p></button>
          </div>
          <div>
            <button className='redirect_btn' aria-label="InstaSpark" onClick={()=>redirect("/InstaSpark/Home")}><p className='footer-font_text'>InstaSpark</p></button>
          </div>
          <div>
            <button className='redirect_btn' aria-label="Dynamic_Portfolio" onClick={()=>redirect('/Dynamic_Portfolio/Home')}> <p className='footer-font_text'>Dynamic Portfolio (WIP)</p></button>
          </div>
        </div>
      </div>
      <div className='FooterBar_container_two'>
        <p className='footer-font_text_other_text'>Handcrafted by Abhijeet kumar @2023</p>
      </div>

    </div>
  )
}

export default Footer