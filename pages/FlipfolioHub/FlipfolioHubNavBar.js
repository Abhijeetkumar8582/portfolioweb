import React, { useCallback, useEffect, useState } from "react";
import Style from "/styles/FlipfolioHub.module.css";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import Link from "next/link";
import Head from 'next/head';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import TextField from '@mui/material/TextField';
import Avatar from '@mui/material/Avatar';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

function FlipfolioHubNavBar() {
    const handleDownload = useCallback(() => {
        const link = document.createElement("a");
        link.href = "/Image/AbhijeetKumar_SE.pdf";
        link.download = "/Image/AbhijeetKumar_SE.pdf";
        link.click();
    });
    const [open, setOpen] = useState(false);
    const [getQuestion, setQuestion] = useState('')
    const [Loading, setLoading] = useState(false)
    const [getAnswerfromPDF, setGetAnswerfromPDF] = useState('')

    const handleClose = () => {
        setOpen(false);
    };
    const [anotherQuestion, setAnotherQuestion] = useState(false);

    const AnotherQuestionForm = () => {
        setAnotherQuestion(false);
    };

    const onQuestionInput = (e) => {
        setQuestion(e.target.value);
        if (e.key === 'Enter') {
            e.preventDefault();
            findAnswerFromPDF();
        }
    }

    const onAnotherQuestion = (e) => {
        setQuestion(e.target.value);

        if (e.key === 'Enter') {
            e.preventDefault();
            setAnotherQuestion(false)
            setOpenQueries(true)
            findAnswerFromPDF()
        }
    }

    const findAnswerFromPDF = () => {
        setOpen(true);
        setLoading(true)
        var myHeaders = new Headers();

        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "user_input": getQuestion
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            mode: 'cors'

        };

        fetch("https://abhijeetkumarsearchalgo.cloud/get_answer", requestOptions)
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Network response was not ok.');
                }
            })
            .then(result => {
                setLoading(false)
                setGetAnswerfromPDF(result.answer)
                setQuestion('')
            })
            .catch(error => setGetAnswerfromPDF('I apologize, but my automated system is currently inactive and unavailable. Kindly consider revisiting at a later time for further assistance. Thank you for your understanding.'));


    }
    const OnAnotherQuestionAsk = () => {
        findAnswerFromPDF()
        AnotherQuestionForm()
    }
    return (
        <>
            <Head>
                <title>FlipfolioHub - Abhijeet</title>
            </Head>
            <nav
                className="navbar navbar-expand-md bg-body-tertiary"
                style={{ backgroundColor: "#2874f0", color: "white" }}
            >
                <div className="container-fluid">
                    <Link
                        className="navbar-brand"
                        href="/"
                        style={{ color: "white", fontWeight: '500',margin:'0' }}
                    >
                        Abhijeet Kumar
                    </Link>
                    {/* <Button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </Button> */}
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-lg-0 mx-auto">
                            <li className="nav-item">
                                <div style={{ minWidth: "550px",width:'100%' }}>
                                    <Paper
                                        component="form"
                                        sx={{
                                            p: "2px 4px",
                                            display: "flex",
                                            alignItems: "center",
                                            width: "100%",
                                        }}
                                    >
                                        <InputBase
                                            onSubmit={(e) => e.preventDefault()}
                                            sx={{ ml: 1, flex: 1 }}
                                            value={getQuestion}
                                            onChange={(e) => onQuestionInput(e)}
                                            onKeyPress={(e) => onQuestionInput(e)}
                                            placeholder="Feel free to ask about me through my friendly bot!"
                                            inputProps={{ "aria-label": "search google maps" }}
                                        />
                                        <IconButton
                                            type="button"
                                            sx={{ p: "10px" }}
                                            aria-label="search"
                                            onClick={findAnswerFromPDF}
                                        >

                                            <SearchIcon />
                                        </IconButton>
                                    </Paper>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <button
                        aria-label="handleDownload"
                        className={`${Style.custombtn} ${Style.btn12}`}
                        onClick={() => handleDownload()}
                    >
                        <span>Download!</span>
                        <span>
                            <i className="fa fa-cloud-download" aria-hidden="true"></i>Resume
                        </span>
                    </button>
                </div>

            </nav>
            


            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle><div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}><Avatar alt="Remy Sharp" src="/Image/abhijeetVirtualBot.webp" /> Virtual Abhijeet Bot </div>

                </DialogTitle>
                <DialogContent>
                    {Loading ? (
                        <div>
                            <div><h6>  Warning: I'm an AI model, and sensitive information might be inadvertently shared. Please refrain from sharing personal or confidential details.
                            </h6></div>
                            <div className="load-row">
                                <span></span>
                                <span></span>
                                <span></span>
                                <span></span>
                            </div>
                        </div>) : (

                        <DialogContentText id="alert-dialog-slide-description">{getAnswerfromPDF}</DialogContentText>)}
                </DialogContent>
                <DialogActions>

                    <Button onClick={() => { setAnotherQuestion(true), handleClose() }}>Another Question</Button>
                    <Button onClick={handleClose}>Close</Button>
                </DialogActions>
            </Dialog>
            <Dialog open={anotherQuestion} onClose={AnotherQuestionForm}>
                <DialogTitle>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}><Avatar alt="Remy Sharp" src="/Image/abhijeetVirtualBot.webp" /> Virtual Abhijeet Bot</div></DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Warning: I'm an AI model, and sensitive information might be inadvertently shared. Please refrain from sharing personal or confidential details.
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        onChange={(e) => onQuestionInput(e)}
                        onKeyPress={(e) => onAnotherQuestion(e)}
                        label="Please ask your question here...."
                        type="text"
                        fullWidth
                        variant="standard"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={AnotherQuestionForm}>Cancel</Button>
                    <Button onClick={OnAnotherQuestionAsk}>Ask</Button>
                </DialogActions>
            </Dialog>

        </>
    );
}

export default FlipfolioHubNavBar;
