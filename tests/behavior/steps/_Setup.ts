import axios from "axios"

// By default, Axios fails every request that returns with a status code >= 400.
// But for the tests we only want them to fail when a server error occurred (status code >= 500).
axios.defaults.validateStatus = function (status) {
    return status < 500
}
