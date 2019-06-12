import React from "react";
import Doctors from '../doctor/Doctor'

const Home =()=> (
    <div>

    <div className="jumbotron jumbotron-fluid ">
                <div className="container">
            <h1><span className="glyphicon fa fa-user-md"></span> Doctor Finder</h1>
                    <p>Find doctors according to your need.</p>
            {/* <!-- Search --> */}
            <form className="navbar-form " role="search">
                <div className="form-group">
                    <input type="text" className="form-control" />
                </div>
                <button type="submit" className="btn btn-default">Search</button>
            </form>
                   
                </div>
            </div>
            <Doctors/>
    </div>
        );
export default Home
