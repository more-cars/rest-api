import {When, world} from "@cucumber/cucumber"
import axios from "axios"
import {ImageNode} from "../../../src/models/images/types/ImageNode"
import {BaseNode} from "../../../src/db/types/BaseNode"

When('the user attaches the {string} {string} to the IMAGE {string}',
    async (partnerNodeType: string, partnerNodeLabel: string, imageLabel: string) => {
        const imageNode: ImageNode = world.recallNode(imageLabel).data
        const partnerNode: BaseNode = world.recallNode(partnerNodeLabel).data

        const response = await axios
            .post(`${process.env.API_URL}/images/${imageNode.id}/belongs-to-node/${partnerNode.id}`)
            .catch(error => {
                console.error(error)
            })

        world.rememberResponse(response)
    })
