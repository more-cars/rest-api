import {When} from "@cucumber/cucumber"
import axios from "axios"
import {ImageNode} from "../../../src/models/images/types/ImageNode"
import {BaseNode} from "../../../src/db/types/BaseNode"

When('the user requests the IMAGE relationship between IMAGE {string} and {string} {string}',
    async function (imageLabel: string, partnerNodeType: string, partnerNodeLabel: string) {
        const imageNode: ImageNode = this.image[imageLabel]
        const partnerNode: BaseNode = this[partnerNodeType.toLowerCase().replace(' ', '')][partnerNodeLabel]

        this.latestResponse = await axios
            .get(`${process.env.API_URL}/images/${imageNode.id}/belongs-to-node/${partnerNode.id}`)
            .catch(error => {
                console.error(error)
            })
    })
