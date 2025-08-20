import {When, world} from "@cucumber/cucumber"
import axios from "axios"
import {ImageNode} from "../../../src/models/images/types/ImageNode"
import {BaseNode} from "../../../src/db/types/BaseNode"

When('the user tries to attach the {string} {string} to the IMAGE {string}',
    async (partnerNodeType: string, partnerNodeLabel: string, imageLabel: string) => {
        const imageNode: ImageNode = world.recallNode(imageLabel)
        const partnerNode: BaseNode = world.recallNode(partnerNodeLabel)

        const response = await axios
            .post(`${process.env.API_URL}/images/${imageNode.id}/belongs-to-node/${partnerNode.id}`, null, {
                validateStatus: function (status) {
                    return status === 422 || status === 404 // treating 404 and 422 as "good" status codes, so axios does not fail the request
                }
            })
            .catch(error => {
                console.error(error)
            })

        world.rememberResponse(response)
    })
