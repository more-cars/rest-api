import {When} from "@cucumber/cucumber"
import axios from "axios"

When('the user requests a non-existing car model', async function () {
    this.latestResponse = await axios
        .get(`${process.env.API_URL}/car-models/-42`, {
            validateStatus: function (status) {
                return status === 404 // treating the 404 as a "good" status code, so axios does not fail the request
            }
        })
})
