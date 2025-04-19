
import Link from 'next/link'


function NavBar() {

    return (
        <>

            <nav className="navbar navbar-expand-lg fixed-top navbar-light" style={{ backgroundColor: "#FDA260", width: '100%', padding: '0px 0px' }}>
                <div className="container" style={{ padding: '0px 0px', justifyContent: 'space-between' }}>
                    <Link className="navbar-brand-text " href="/">Home</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse  justify-content-center" id="navbarTogglerDemo02" >
                        <ul className="nav justify-content-center ">
                            <li className="nav-item">
                                <Link className="nav-link active navbar-brand-text mx-2" href="/Portfolio/About">About</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link navbar-brand-text mx-2" href="/Portfolio/Experience">Experience</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link navbar-brand-text mx-2" href="/Portfolio/Project">Projects</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default NavBar
