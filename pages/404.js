
import React, {  useState } from 'react'

import router from 'next/router'
import Image from 'next/legacy/image'


function Notfound() {
    const [time, setTime] = useState(10)

    setTimeout(
        function () {
            if (time === 0) {
                router.push("/")
            } else {
                setTime(time - 1)
            }
        }
        , 1000)


    return (
        <>
            <div style={{ backgroundColor: "#d84c7e", width: "100vw", height: "100vh" }}>


                <div style={{ maxWidth: "700px", marginTop: "7%", width: "100%", margin: "auto", position: "relative" }}>

                    <Image src='/Image/000-404.webp' width={800} layout="responsive" height={400}></Image>
                    <p style={{ textAlign: "center", marginTop: "5%" }}>Sorry, I couldn't find the page you were looking for. It's possible that it's gone on a wild adventure, or maybe it's just taking a nap. Either way, I hope you find what you're looking for! If not, feel free to blame the internet goblins.</p>
                </div>

                <h1 style={{ textAlign: "center", marginTop: "7%", fontFamily: "Copperplate" }}>you will redirect in {time} second</h1>
            </div>
        </>
    )
}

export default Notfound