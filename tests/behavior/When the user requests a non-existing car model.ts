import {When} from "@cucumber/cucumber"
import axios from "axios"

When('the user requests a non-existing car model', async function () {
    this.latestResponse = await axios
        .get("http://localhost:3000/car-models/-42", {
            validateStatus: function (status) {
                return status === 404
            }
        })
})
