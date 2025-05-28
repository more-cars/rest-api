import {When} from "@cucumber/cucumber"
import axios from "axios"

When('the user requests all {string}s', async function (nodeType: string) {
    let path: string

    switch (nodeType.toLowerCase()) {
        case 'brand':
            path = 'brands'
            break
        case 'car model':
            path = 'car-models'
            break
        case 'image':
            path = 'images'
            break
        default:
            return
    }

    this.latestResponse = await axios
        .get(`${process.env.API_URL}/${path}`)
})
