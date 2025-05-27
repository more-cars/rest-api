import {When} from "@cucumber/cucumber"
import axios from "axios"

When('the user creates a(n) {string}', async function (nodeType: string) {
    const data: any = {}
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
        .post(`${process.env.API_URL}/${path}`, data)
        .catch(error => {
            console.error(error.toJSON())
        })
})
