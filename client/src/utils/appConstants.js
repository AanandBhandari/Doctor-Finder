let appconstants = {};

if (process.env.NODE_ENV === "production") {
    appconstants = {
        base_url: ''
    };
} else {
    appconstants = {
        base_url: 'http://localhost:3001/api'
    };
}

export default appconstants;