import appconstants from './appConstants'
const { base_url } = appconstants
console.log(base_url);

export const signup = (user) => {
    return fetch(`${base_url}/doctor/signup`,{
        method : 'POST',
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    })
    .then(response =>{
        return response.json()
    })
    .catch(e => {
        console.log(e);
    })
}

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
    return `${base_url}/doctor/photo/${id}?${new Date().getTime()}`;
};
export const isAuthenticated = () => {
    if (typeof window == "undefined") {
        return false;
    }

    if (localStorage.getItem("jwt")) {
        return JSON.parse(localStorage.getItem("jwt"));
    } else {
        return false;
    }
}
export const getSpecialities = (s) => {
    return fetch(`${base_url}/doctorDataSpecialities?s=${s}`, {
        method: 'GET'
    })
        .then(data => {
            // console.log(data); response object
            return data.json()
        })
        .catch(e=>console.log(e))
}
export const getTiltes = (s) => {
    return fetch(`${base_url}/doctorDataTitles?s=${s}`, {
        method: 'GET'
    })
        .then(data => {
            return data.json()
        })
        .catch(e => console.log(e))
}