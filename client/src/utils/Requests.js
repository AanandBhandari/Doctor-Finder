import appconstants from '../utils/appConstants'
const { base_url } = appconstants
// get all Doctors
export const getDoctors = () => {
    return fetch(`${base_url}/getDoctors`,{
        method : 'GET'
    })
    .then(doctors=> {
        return doctors.json()
    })
    .catch(e=>console.log(e))
}
export const getProfileImage = id => {
    return `${base_url}/doctor/photo/${id}`;
};