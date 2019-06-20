import React, { Component } from "react";
import { signup, doctorData } from "../../utils/doctorRequests";
import { SignUpForm, BasicInfoForm, SpecialitiesForm, TitlesForm} from "./SignUpform";
import { Link } from "react-router-dom";

class BasicInfo extends Component {
    constructor() {
        super();
        this.state = {
           "fields": [
                {
                    id: 'name',
                    title: 'First Name',
                    val: ''
                },
                 {
                    id: 'lastname',
                    title: 'Last Name',
                    val: ''
                },
                 {
                    id: 'email',
                    title: 'Email',
                    val: ''
                },
                 {
                    id: 'password',
                    title: 'Password',
                    val: ''
                },
                 {
                    id: 'phoneno',
                    title: 'Phone Number',
                    val: ''
                },
                 {
                    id: 'website',
                    title: 'Website',
                    val: ''
                },
                 {
                    id: 'currentCity',
                    title: 'Current City',
                    val: ''
                },
                 {
                    id: 'description',
                    title: 'Description',
                    val: ''
                }
            ] 
        }
    }
    handleChange = (e,i) => {
        let v = this.state.fields[i]
        v.val = e.target.value;

        this.setState({})    
    }
    
    render() {
        return(

        <BasicInfoForm
            stateValues={this.state}  
            handleChange={this.handleChange}  
        />
        )
    }
}

class Specialities extends Component {
    constructor() {
        super();
        this.state = {
            specialities: [''],
            sQuryRslt: []
        }
    }
    addSpecialities = () => {
        this.setState({specialities: [...this.state.specialities,'']})
    }
    deleteSpecialities = (i) => {
        let dltItem = this.state.specialities;
        this.setState({ specialities: dltItem.splice(i, 1) })
    }
    handleSpecialities = (e, i) => {
        let item = this.state.specialities
        item[i] = e.target.value
        this.setState({ specialities: item })
        if (item[i] && item[i].length > 1) {
            doctorData(item[i], 'speciality')
            .then(s => {
                    this.setState({ sQuryRslt: s })
                })
        }

    }
    render() {
        return (
            <SpecialitiesForm
                specialities={this.state.specialities}
                addSpecialities={this.addSpecialities}
                deleteSpecialities={this.deleteSpecialities}
                handleSpecialities={this.handleSpecialities}
            />
        )
    }
}

class Tiltes extends Component {
    constructor() {
        super();
        this.state = {
            titles: [''],
            tQuryRslt: []
        }
    }
    addTitles = () => {
        this.setState({ titles: [...this.state.titles, ''] })
    }
    deleteTitles = (i) => {
        let dltItem = this.state.titles;
        this.setState({ titles: dltItem.splice(i, 1) })
    }
    handleTitles = (e, i) => {
        let item = this.state.titles
        item[i] = e.target.value
        this.setState({ titles: item })
        if (item[i] && item[i].length > 1) {
            doctorData(item[i],'title')
                .then(s => {
                    this.setState({ tQuryRslt: s })
                })
        }

    }
    render() {
        return (
            <TitlesForm
                titles={this.state.titles}
                addTitles={this.addTitles}
                deleteTitles={this.deleteTitles}
                handleTitles={this.handleTitles}
            />
        )
    }
}

class DoctorSignup extends Component {
    constructor() {
        super();
        this.state = {
            error : '',
            success : false
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
                <BasicInfo/>
                <Specialities/>
                <Tiltes/>
                {/* <SignUpForm
                    clickSubmit={this.clickSubmit}
                /> */}
            </div>
        );
    }
}
export default DoctorSignup