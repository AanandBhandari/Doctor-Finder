import React from "react";
import { Link, withRouter } from "react-router-dom";
const Menu = () => (
    <nav className="navbar navbar-inverse navbar-fixed-top" role="navigation">
        <div className="container">
            {/* <!-- Logo and responsive toggle --> */}
            <div className="navbar-header">
                <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#navbar">
                    <span className="sr-only">Toggle navigation</span>
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                </button>
                <a className="navbar-brand" href="#">
                    <span className="glyphicon fa fa-heartbeat"></span>
                    Home
                </a>
            </div>
            {/* <!-- Navbar links --> */}
            <div className="collapse navbar-collapse" id="navbar">
                <ul className="nav navbar-nav">
                    <li className="active">
                        <a href="#">Home</a>
                    </li>
                    <li>
                        <a href="#">About</a>
                    </li>
                    <li>
                        <a href="#">Products</a>
                    </li>
                    <li className="dropdown">
                        <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Services <span className="caret"></span></a>
                        <ul className="dropdown-menu" aria-labelledby="about-us">
                            <li><a href="#">Engage</a></li>
                            <li><a href="#">Pontificate</a></li>
                            <li><a href="#">Synergize</a></li>
                        </ul>
                    </li>
                </ul>

                <Link className="navbar-right btn btn-info " to="/" style={{margin:5}}>Signup</Link>
                <Link className="navbar-right btn btn-info" to="/" style={{ margin: 5 }}>Signin</Link>

            </div>
                {/* <!-- /.navbar-collapse --> */}
        </div>
            {/* <!-- /.container --> */}
    </nav>
)
export default withRouter(Menu)