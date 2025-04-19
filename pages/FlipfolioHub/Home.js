import React, { useState, useCallback, useEffect } from "react";
import Style from "/styles/FlipfolioHub.module.css";
import Image from "next/image";
import TextField from "@mui/material/TextField";
import { useRouter } from "next/router";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Head from 'next/head';

function Home() {
  const router = useRouter();
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: " 5px solid rgba(0,0,0,.07)",
    boxShadow: 24,
    p: 4,
  };

  const [open, setOpen] = React.useState(false);
  const [getUserName, setUserName] = useState("");
  const [getAvatar, setAvatar] = useState("https://randomuser.me/api/portraits/med/women/84.jpg");
  const handleOpen = useCallback(() => {
    fetch(`https://randomuser.me/api/`)
      .then((res) => res.json())
      .then((data) => {
        setUserName(`${data.results[0].name.first} ${data.results[0].name.last}`);
        sessionStorage.setItem('UserName', `${data.results[0].name.first} ${data.results[0].name.last}`)
        setAvatar(data.results[0].picture.medium);
      });
    setOpen(true);
  }, [setUserName, setAvatar]);

  const handleClose = () => setOpen(false);


  const [error, throwError] = useState(false);

  const generateName = useCallback(() => {
    fetch(`https://randomuser.me/api/`)
      .then((res) => res.json())
      .then((data) => {
        setUserName(`${data.results[0].name.first} ${data.results[0].name.last}`);
        sessionStorage.setItem('UserName', `${data.results[0].name.first} ${data.results[0].name.last}`)
        setAvatar(data.results[0].picture.medium);
      });
  }, [setUserName, setAvatar]);

  const UserNameInput = useCallback(
    (e) => {
      setUserName(e.target.value);
      sessionStorage.setItem('UserName', e.target.value)

    },
    [setUserName]
  );

  const handleLogin = useCallback(() => {
    if (getUserName.length === 0) {
      throwError(true);
    } else {
      router.push("/FlipfolioHub/MainPage");
    }
  }, [throwError, getUserName]);
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>

      <Head>
        <title>FlipfolioHub - Abhijeet</title>
        <meta property="og:title" content="FlipfolioHub - Abhijeet" />
        <meta property="og:description" content="I'm designing my portfolio as a FlipfolioHub-inspired UI, also developing a search algorithm for easy inquiries about me. Exciting things coming soon!" />
        <meta property="og:image" content="/Image/FlipfolioHubUi.webp" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="628" />
        <meta property="og:url" content="https://abhijeetkumar-developer.netlify.app/FlipfolioHub/Home" />
        <meta property="og:type" content="website" />
      </Head>

      <div className={Style.FlipfolioHubBox}>
        <div className={Style.FlipfolioHubBox_one}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <h3 className={Style.flipkarText}>Abhijeet Kumar</h3>
            <div className={Style.ImageLogo_div}>
              <Image
                priority={true}
                className={Style.intro_images}
                src="/Image/AbhiFlipfolioHub.webp"
                width={500}
                height={500}
                alt="portfolio_image"
              ></Image>
            </div>
          </div>
          <div>
            <h4>
              {" "}
              Explore a diverse range of my work, highlighting my skills,
              projects, and achievements.
            </h4>
          </div>
          <div className={Style.givenName}>
            <p>Let's know each other</p>
          </div>
          <div className={Style.textInputDIv}>
            <TextField
              id="standard-basic-1"
              style={{ width: "100%" }}
              label={error ? "Please enter your Name or Generate one" : "Name"}
              value={getUserName}
              error={error}
              onChange={(e) => UserNameInput(e)}
              required
              variant="standard"
              aria-label="Enter_name"
            />
          </div>
          <div className={Style.textInputDIv}>
            <TextField
              id="standard-basic-2"
              style={{ width: "100%" }}
              label="Email Address optional"
              variant="standard"
              aria-label="Email Address optional"
            />
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "30px",
              }}
            >
              <label>
                <input className={Style.userConcern} lable="checkbox" type="checkbox" />

                <p style={{ display: "contents", fontSize: "12px" }}>
                  Keep Name for all the portfolio
                </p>
              </label>
            </div>
            <div>
              <button aria-label="forgotName" className={Style.forgetNameBTn} onClick={handleOpen}>
                <p>
                  {" "}
                  <span
                    style={{
                      color: "#FF0000",
                      fontWeight: "500",
                      fontSize: "12px",
                    }}
                  >
                    Forget Name?
                  </span>
                </p>
              </button>
            </div>
          </div>
          <div>
            <button
              aria-label="handlelogin"
              className={`${Style.custombtn} ${Style.btn2}`}
              onClick={handleLogin}
            >
              Login
            </button>
          </div>
          <div>
            <p>
              Don't know Name ?{" "}
              <button aria-label="don\'t know name" className={Style.forgetNameBTn} onClick={handleOpen}>
                <p>
                  {" "}
                  <span
                    style={{
                      color: "#FF0000",
                      fontWeight: "500",
                      fontSize: "15px",
                    }}
                  >
                    Generate One
                  </span>
                </p>
              </button>
            </p>
          </div>
        </div>

        <div className={Style.FlipfolioHubBox_two}>
          <div style={{ margin: "50px", color: "white" }}>
            <p>
              I invite you to explore my portfolio and share any feedback or
              suggestions you may have. Your input is valuable in helping me
              improve it!
            </p>
          </div>
          <div className={Style.FlipfolioHubBox_two_Div_image}>
            <link
              rel="preload"
              as="image"
              href="/FlipfolioHub/FlipfolioHub_div_image.webp"
              imageSrcSet="/FlipfolioHub/FlipfolioHub_div_image.webp 1x"
            />
            <Image
              className={Style.FlipfolioHubBox_two_image}
              width={382}
              height={400}
              priority={true}
              src="/FlipfolioHub/FlipfolioHub_div_image.webp"
              style={{ width: "100%" }}
              alt="FlipfolioHub_div_image"
            />
          </div>
        </div>
      </div>

      <div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <div className={Style.avatar}>
                {/* <!-- Avatar image --> */}
                <Image loading="lazy" alt={getAvatar} width={50} height={50} className={Style.avatar__image} src={getAvatar} />
              </div>
              <div>
                <h4>{getUserName}</h4>
              </div>
            </div>
            <div style={{ display: "flex", justifyContent: "end" }}>
              <button
                aria-label="generateName"
                className={Style.generateAnotherOne}
                onClick={generateName}
              >
                Another One
              </button>
            </div>
          </Box>
        </Modal>
      </div>
    </div>
  );
}

export default Home;
