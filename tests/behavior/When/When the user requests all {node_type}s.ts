import {When} from "@cucumber/cucumber"
import axios from "axios"

When('the user requests all {string}s', async function (nodeType: string) {
    let path: string

    switch (nodeType) {
        case 'brand':
            path = 'brands'
            break
        case 'car model':
            path = 'car-models'
            break
        default:
            return
    }

    this.latestResponse = await axios
        .get(`${process.env.API_URL}/${path}`)
})
