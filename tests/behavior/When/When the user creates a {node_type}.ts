import {When} from "@cucumber/cucumber"
import axios from "axios"
import FakeBrand from "../../_toolbox/fixtures/nodes/FakeBrand"
import FakeCarModel from "../../_toolbox/fixtures/nodes/FakeCarModel"
import FakeImage from "../../_toolbox/fixtures/nodes/FakeImage"

When('the user creates a(n) {string}', async function (nodeType: string) {
    let data: any = {}
    let path: string

    switch (nodeType.toLowerCase()) {
        case 'brand':
            path = 'brands'
            data = FakeBrand
            break
        case 'car model':
            path = 'car-models'
            data = FakeCarModel
            break
        case 'image':
            path = 'images'
            data = FakeImage
            break
        default:
            return
    }

    this.latestResponse = await axios
        .post(`${process.env.API_URL}/${path}`, data)
        .catch(error => {
            console.error(error)
        })
})
