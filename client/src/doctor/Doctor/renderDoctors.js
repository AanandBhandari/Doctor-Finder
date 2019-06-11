import React from "react";
import { Link } from "react-router-dom";
const RenderDoctors = ({doctors}) => {
    return (
        <div className="row">
        {doctors.map((doctor,i)=>{
            return(

        <article className="col-md-4 article-intro">
            <a href="#">
                <img className="img-responsive img-rounded" src="holder.js/700x300" alt=""/>
                </a>
                <h3>
                    <a href="#">{doctor.name} {doctor.lastname}</a>
                </h3>
                <p>Collaboratively administrate empowered markets via plug-and-play networks. Dynamically procrastinate B2C users after installed base benefits. Dramatically visualize customer directed convergence without revolutionary ROI.</p>
            </article>
            )
        })}
        </div>
    )
}
export default RenderDoctors;