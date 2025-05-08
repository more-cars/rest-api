import {When} from "@cucumber/cucumber"
import axios from "axios"

When('the user requests all brands', async function () {
    this.latestResponse = await axios
        .get(`${process.env.API_URL}/brands`)
})
