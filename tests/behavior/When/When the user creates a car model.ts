import {When} from "@cucumber/cucumber"
import axios from "axios"
import FakeCarModel from "../../fixtures/nodes/FakeCarModel"

When('the user creates a car model', async function () {
    this.latestResponse = await axios
        .post(`${process.env.API_URL}/car-models`, FakeCarModel)
        .catch(error => {
            console.error(error)
        })
})
