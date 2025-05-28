import {When} from "@cucumber/cucumber"
import axios from "axios"
import {BaseNode} from "../../../src/types/BaseNode"

When('the user requests the {string} {string}', async function (nodeType: string, label: string) {
    let node: BaseNode
    let path: string

    switch (nodeType.toLowerCase()) {
        case 'brand':
            node = this.brand[label]
            path = 'brands'
            break
        case 'car model':
            node = this.carModel[label]
            path = 'car-models'
            break
        case 'image':
            node = this.image[label]
            path = 'images'
            break
        default:
            return
    }

    this.latestResponse = await axios
        .get(`${process.env.API_URL}/${path}/${node.id}`)
})
