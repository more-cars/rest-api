import {When} from "@cucumber/cucumber"
import axios from "axios"
import FakeBrand from "../../fixtures/nodes/FakeBrand"

When('the user creates a brand', async function () {
    this.latestResponse = await axios
        .post(`${process.env.API_URL}/brands`, FakeBrand)
        .catch(error => {
            console.error(error.toJSON())
        })
})
