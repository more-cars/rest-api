import {When, world} from "@cucumber/cucumber"
import axios from "axios"
import {BaseNode} from "../../../src/db/types/BaseNode"

When('the user requests the {string} {string}',
    async (nodeType: string, label: string) => {
        let node: BaseNode
        let path: string

        switch (nodeType.toLowerCase()) {
            case 'brand':
                node = world.recallNode(label)
                path = 'brands'
                break
            case 'car model':
                node = world.recallNode(label)
                path = 'car-models'
                break
            case 'image':
                node = world.recallNode(label)
                path = 'images'
                break
            default:
                return
        }

        const response = await axios
            .get(`${process.env.API_URL}/${path}/${node.id}`)

        world.rememberResponse(response)
    })
