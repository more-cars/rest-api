import {When} from "@cucumber/cucumber"
import axios from "axios"
import {ImageNode} from "../../../src/types/images/ImageNode"
import {BaseNode} from "../../../src/types/BaseNode"

When('the user tries to attach the {string} {string} to the IMAGE {string}',
    async function (partnerNodeType: string, partnerNodeLabel: string, imageLabel: string) {
        const imageNode: ImageNode = this.image[imageLabel]
        const partnerNode: BaseNode = this[partnerNodeType.toLowerCase().replace(' ', '')][partnerNodeLabel]

        this.latestResponse = await axios
            .post(`${process.env.API_URL}/images/${imageNode.id}/belongs-to-node/${partnerNode.id}`, null, {
                validateStatus: function (status) {
                    return status === 404 // treating the 404 as a "good" status code, so axios does not fail the request
                }
            })
            .catch(error => {
                console.error(error)
            })
    })
