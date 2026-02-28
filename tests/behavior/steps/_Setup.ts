import {setWorldConstructor, World} from "@cucumber/cucumber"
import axios from "axios"

// By default, Axios fails every request that returns with a status code >= 400.
// But for the tests we only want them to fail when a server error occurred (status code >= 500).
axios.defaults.validateStatus = function (status) {
    return status < 500
}

// Adding a handful of helper functions to the cucumber "world"
// to simplify the test code and make it more stable.
class CustomWorld extends World {
    response: any

    constructor(options: any) {
        super(options)
    }

    rememberResponse(response: any) {
        this.response = response
    }

    recallResponse() {
        return this.response
    }
}

setWorldConstructor(CustomWorld)
