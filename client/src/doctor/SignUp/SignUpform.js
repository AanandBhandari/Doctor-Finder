import React from 'react'
{/* <button type="submit" className="btn btn-primary"
    onClick={props.clickSubmit}
>
    Submit
                </button>      */}
let Input =({index, id,title,val,handleChange}) =>{
        return (
            <fieldset className="form-group">
            <label htmlFor={id}>{title}</label>
            <input type="text" className="form-control" id={id} name={id}
                onChange={e=>handleChange(e,index)}
                value={val}
            />
            </fieldset>
        )
    }
    export const BasicInfoForm = (props) => {
        const { stateValues, handleChange} = props;
        const {fields} = stateValues
        return (
            <>
        {
            fields.map((field,i)=> (
            <Input key={i} index={i} id={field.id} title={field.title} val={field.val} handleChange={handleChange}/>
               
            ))
        }
        </>
    )
}

export const SpecialitiesForm = (props) => {
    const {specialities} = props
    return(
        <fieldset className="form-group">
            {specialities.map((s, i) => {
                return (
                    <div className="input-group" key={i}>
                        <label htmlFor="specialities">specialities</label>
                        <input type="text" className="form-control" id="specialities" name="specialities"
                            onChange={(e) => props.handleSpecialities(e, i)}
                            value={s} />
                        <div className="input-group-btn" style={{ paddingTop: '25px' }}>
                            <button
                                className={`btn btn-${i < specialities.length - 1 ? 'danger' : 'success'}`} type="button"
                                onClick={() => {
                                    if (!(i < specialities.length - 1)) {
                                        props.addSpecialities()
                                    } else {
                                        props.deleteSpecialities(i)
                                    }
                                }}
                            >
                                <span
                                    className={`glyphicon glyphicon-${i < specialities.length - 1 ? 'minus' : 'plus'}`} aria-hidden="true">
                                </span>
                            </button>
                        </div>
                    </div>

                )
            })}
        </fieldset>
    )
}
export const TitlesForm = (props) => {
    const { titles } = props
    return (
        <fieldset className="form-group">
            {titles.map((s, i) => {
                return (
                    <div className="input-group" key={i}>
                        <label htmlFor="titles">titles</label>
                        <input type="text" className="form-control" id="titles" name="titles"
                            onChange={(e) => props.handleTitles(e, i)}
                            value={s} />
                        <div className="input-group-btn" style={{ paddingTop: '25px' }}>
                            <button
                                className={`btn btn-${i < titles.length - 1 ? 'danger' : 'success'}`} type="button"
                                onClick={() => {
                                    if (!(i < titles.length - 1)) {
                                        props.addTitles()
                                    } else {
                                        props.deleteTitles(i)
                                    }
                                }}
                            >
                                <span
                                    className={`glyphicon glyphicon-${i < titles.length - 1 ? 'minus' : 'plus'}`} aria-hidden="true">
                                </span>
                            </button>
                        </div>
                    </div>

                )
            })}
        </fieldset>
    )
}