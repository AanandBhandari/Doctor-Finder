import React, { Component } from "react";
import {getDoctors} from '../../utils/Requests'
import RenderDoctors from './renderDoctors'
class Doctors extends Component {
    constructor() {
        super();
        this.state = {
            doctors : []
        }
    }
    componentDidMount() {
        getDoctors().then(doctors =>{
            if (doctors.error) {
                console.log(doctors.error);
            } else {
                this.setState({doctors})
            }
        })
    }
    render(){
        const {doctors} = this.state
        return (
            <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                        <h1 className="page-header">Doctors
                    {/* <small></small> */}
                        </h1>
                        <p>Proactively envisioned multimedia based expertise and cross-media growth strategies. Seamlessly visualize quality intellectual capital without superior collaboration and idea-sharing. Holistically pontificate installed base portals after maintainable products.</p>
                    </div>
                </div>
                {/* all doctors here */}
                <RenderDoctors doctors={doctors}/>
                </div>
        )
    }
}
export default Doctors;