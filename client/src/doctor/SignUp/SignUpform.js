import React from 'react'
const SignUpForm = (props) => {
    console.log('world');
    const { name, lastname, email, password, phoneno, website, currentCity, description, specialities,titles} = props.stateValues
    return(
        <form >
        {/* name */}
            <fieldset className="form-group">
                <label htmlFor="name">First Name</label>
                <input type="text" className="form-control" id="name" name="name"
                    onChange = {props.handleChange}
                    value = {name}
                />
            </fieldset>
            {/* lastname */}
            <fieldset className="form-group">
                    <label htmlFor="lastname">Last Name</label>
                    <input type="text" className="form-control" id="lastname" name="lastname"
                    onChange={props.handleChange}
                    value={lastname}
                    />
            </fieldset>
            {/* email */}
            <fieldset className="form-group">
                <label htmlFor="email">Email</label>
                <input type="email" className="form-control" id="email" name="email" 
                    onChange={props.handleChange}
                    value={email}
                />
            </fieldset>
            {/* password */}
            <fieldset className="form-group">
                <label htmlFor="password">Password</label>
                <input type="password" className="form-control" id="password" name="password" 
                    onChange={props.handleChange}
                    value={password}
                />
            </fieldset>
            {/* phoneno */}
            <fieldset className="form-group">
                <label htmlFor="phoneno">Phone No.</label>
                <input type="text" className="form-control" id="phoneno" name="phoneno" 
                    onChange={props.handleChange}
                    value={phoneno}
                />
            </fieldset>
            {/* website */}
            <fieldset className="form-group">
                <label htmlFor="website">Website</label>
                <input type="text" className="form-control" id="website" name="website" 
                    onChange={props.handleChange}
                    value={website}
                />
            </fieldset>
            {/* currentCity */}
            <fieldset className="form-group">
                <label htmlFor="currentCity">Current City</label>
                <input type="text" className="form-control" id="currentCity" name="currentCity" 
                    onChange={props.handleChange}
                    value={currentCity}
                />
            </fieldset>
            {/* description */}
            <fieldset className="form-group">
                <label htmlFor="description">Description</label>
                <input type="text" className="form-control" id="description" name="description"
                    onChange={props.handleChange}
                    value={description} />
            </fieldset>
            {/* specialities */}
            <fieldset className="form-group">
                {specialities.map((s,i)=>{
                    return(
                    <div className="input-group" key={i}>
                        <label htmlFor="specialities">specialities</label>
                        <input type="text" className="form-control"  id="specialities" name="specialities"
                            onChange={(e)=>props.handleSpecialities(e,i)}
                            value={s} />
                        <div className="input-group-btn" style={{ paddingTop: '25px'}}>
                                <button 
                                className={`btn btn-${i < specialities.length - 1 ? 'danger' : 'success'}`} type="button"
                                onClick={()=> {
                                    if(!(i < specialities.length - 1)){
                                        props.addSpecialities()
                                    } else {
                                        props.deleteSpecialities(i)
                                    }
                                }}
                                   >
                                <span 
                                className={`glyphicon glyphicon-${i<specialities.length-1 ? 'minus' : 'plus'}`} aria-hidden="true">
                                </span> 
                                </button>
                        </div>
                    </div>
                    
                    )
                })}
            </fieldset>
            {/* titles */}
            {/* <fieldset className="form-group">
                <div className="input-group">
                <label htmlFor="titles">Titles</label>
                <input type="text" className="form-control" id="titles" name="titles" 
                    onChange={props.handleTitles}
                    value={titles}
                />
                <div className="input-group-btn" style={{ paddingTop: '25px' }}>
                    <button className="btn btn-success" type="button" onclick="education_fields();"> <span className="glyphicon glyphicon-plus" aria-hidden="true"></span> </button>
                </div>
                </div>
            </fieldset> */}
                    <button type="submit" className="btn btn-primary"
                onClick={props.clickSubmit}
                >
                Submit
                </button>
        </form>
    )
}
export default SignUpForm