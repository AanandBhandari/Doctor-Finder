import React,{Component} from "react";
import { Link } from "react-router-dom";
import { getProfileImage} from '../../utils/doctorRequests'
import defaultImage from '../../images/images.png'
const RenderDoctors =({doctors}) =>{
        return (
        <div className="row">
        {doctors.map((doctor,i)=>{
            let dp = getProfileImage(doctor._id)
            let photo_url = dp ? dp : defaultImage
            return(
            <article key={i} className="col-md-4 article-intro">
                <img className="img-responsive img-rounded" style={{
                    width: "100%",
                    objectFit: "cover"
                }} src={photo_url} alt={photo_url}/>
                <h3>
                    <a href="#">{doctor.name} {doctor.lastname}</a>
                </h3>
                    <p>{doctor.specialities}</p>
            </article>
            )
        })}
        </div>
    )
}
export default RenderDoctors;