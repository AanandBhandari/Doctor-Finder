import React from "react";
import { Link } from "react-router-dom";
import { getProfileImage} from '../../utils/Requests'
const RenderDoctors = ({doctors}) => {
    return (
        <div className="row">
        {doctors.map((doctor,i)=>{
            let photo_url = getProfileImage(doctor._id)
            console.log(photo_url)
            return(

        <article key={i} className="col-md-4 article-intro">
            <a href="#">
                        <img className="img-responsive img-rounded" style={{
                            width: "100%",
                            height: "15vw",
                            objectFit: "cover"
                        }} src={photo_url} alt=""/>
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