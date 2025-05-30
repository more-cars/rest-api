import {Given} from "@cucumber/cucumber"
import axios from "axios"
import {ImageNode} from "../../../src/types/images/ImageNode"
import {BaseNode} from "../../../src/types/BaseNode"

Given('there exists a relationship {string} between IMAGE {string} and {string} {string}',
    async function (realationshipLabel: string, imageLabel: string, partnerNodeType: string, partnerNodeLabel: string) {
        const imageNode: ImageNode = this.image[imageLabel]
        const partnerNode: BaseNode = this[partnerNodeType.toLowerCase().replace(' ', '')][partnerNodeLabel]

        this.latestResponse = await axios
            .post(`${process.env.API_URL}/images/${imageNode.id}/belongs-to-node/${partnerNode.id}`)
            .catch(error => {
                console.error(error)
            })

        this.relationship[realationshipLabel] = this.latestResponse.data
    })
