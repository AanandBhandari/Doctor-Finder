import React, { Component } from "react";
import { signup, getSpecialities } from "../../utils/doctorRequests";
import SignUpForm from "./SignUpform";
import { Link } from "react-router-dom";

class DoctorSignup extends Component {
    constructor() {
        super();
        this.state = {
            name : '',
            lastname : '',
            email : '',
            password : '',
            phoneno : '',
            website : '',
            currentCity : '',
            description : '',
            specialities : [''],
            titles : [''],
            error : '',
            sQuryRslt : [],
            success : false
        }
    }
    handleChange = (e) => {
        this.setState({error : '',success : false})
        this.setState({[e.target.name]:e.target.value})
    }
    addSpecialities = () => {
        console.log('add');
        this.setState({specialities:[...this.state.specialities,'']})
    }
    deleteSpecialities = (i) => {
        let dltItem = this.state.specialities;
        this.setState({specialities:dltItem.splice(i,1)})
    }
    handleSpecialities=(e,i) => {
        let item = this.state.specialities
        item[i] = e.target.value
        this.setState({specialities:item})
        if (item[i] && item[i].length>1) {
            getSpecialities(item[i])
            .then(s=> {
                this.setState({sQuryRslt:s})
            })
        }

    }
    clickSubmit = async(e) => {
        e.preventDefault()
        const { name, lastname, email, password, phoneno, website, currentCity, description, specialities, titles } =this.state;
        const doctor = { name, lastname, email, password, phoneno, website, currentCity, description, specialities, titles }
        // const data = await signup(doctor)
        console.log(doctor);

    }
    render() {
        const { error, success } = this.state;
        console.log('hello');
        return (
            <div className="container">
                <h2 className="mt-5 mb-5">Signup</h2>

                {error && <div className="alert alert-danger">{error}</div>}

                {success && (
                    <div className="alert alert-success">
                        Successfully created account. Please{" "}
                        <Link to="/doctorSignIn">Sign In</Link>
                    </div>
                )}
                <SignUpForm
                    stateValues={this.state}
                    handleChange={this.handleChange}
                    addSpecialities={this.addSpecialities}
                    deleteSpecialities={this.deleteSpecialities}
                    handleSpecialities={this.handleSpecialities}
                    handelTitles = {this.handelTitles}
                    clickSubmit={this.clickSubmit}
                />
            </div>
        );
    }
}
export default DoctorSignup