import {When} from "@cucumber/cucumber"
import axios from "axios"
import {ImageNode} from "../../../src/types/images/ImageNode"
import {BaseNode} from "../../../src/types/BaseNode"

When('the user tries to request the IMAGE relationship between IMAGE {string} and {string} {string}',
    async function (imageLabel: string, partnerNodeType: string, partnerNodeLabel: string) {
        const imageNode: ImageNode = this.image[imageLabel]
        const partnerNode: BaseNode = this[partnerNodeType.toLowerCase().replace(' ', '')][partnerNodeLabel]

        this.latestResponse = await axios
            .get(`${process.env.API_URL}/images/${imageNode.id}/belongs-to-node/${partnerNode.id}`, {
                validateStatus: function (status) {
                    return status === 404 || status === 422 // treating 404 and 422 as a "good" status codes, so axios does not fail the request
                }
            })
            .catch(error => {
                console.error(error)
            })
    })
