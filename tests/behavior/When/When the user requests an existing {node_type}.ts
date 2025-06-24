import {When} from "@cucumber/cucumber"
import axios from "axios"
import {BaseNode} from "../../../src/db/types/BaseNode"
import {getAllNodesOfType as getAllBrands} from "../../../src/db/nodes/brands/getAllNodesOfType"
import {getAllNodesOfType as getAllCarModels} from "../../../src/db/nodes/car-models/getAllNodesOfType"
import {getAllNodesOfType as getAllImages} from "../../../src/db/nodes/images/getAllNodesOfType"

When('the user requests an existing {string}', async function (nodeType: string) {
    let path: string
    let node: BaseNode

    switch (nodeType.toLowerCase()) {
        case 'brand':
            path = 'brands'
            node = (await getAllBrands())[0]
            break
        case 'car model':
            path = 'car-models'
            node = (await getAllCarModels())[0]
            break
        case 'image':
            path = 'images'
            node = (await getAllImages())[0]
            break
        default:
            return
    }

    this.latestResponse = await axios
        .get(`${process.env.API_URL}/${path}/${node.id}`)
})
