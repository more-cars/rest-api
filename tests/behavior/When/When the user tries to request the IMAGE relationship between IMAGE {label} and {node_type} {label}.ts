import {When, world} from "@cucumber/cucumber"
import axios from "axios"
import {ImageNode} from "../../../src/models/images/types/ImageNode"
import {BaseNode} from "../../../src/db/types/BaseNode"

When('the user tries to request the IMAGE relationship between IMAGE {string} and {string} {string}',
    async (imageLabel: string, partnerNodeType: string, partnerNodeLabel: string) => {
        const imageNode: ImageNode = world.recallNode(imageLabel)
        const partnerNode: BaseNode = world.recallNode(partnerNodeLabel)

        const response = await axios
            .get(`${process.env.API_URL}/images/${imageNode.id}/belongs-to-node/${partnerNode.id}`, {
                validateStatus: function (status) {
                    return status === 404 || status === 422 // treating 404 and 422 as a "good" status codes, so axios does not fail the request
                }
            })
            .catch(error => {
                console.error(error)
            })

        world.rememberResponse(response)
    })
