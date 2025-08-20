import {Given, world} from "@cucumber/cucumber"
import axios from "axios"
import {ImageNode} from "../../../src/models/images/types/ImageNode"
import {BaseNode} from "../../../src/db/types/BaseNode"

Given('there exists a relationship {string} between IMAGE {string} and {string} {string}',
    async (relationshipLabel: string, imageLabel: string, partnerNodeType: string, partnerNodeLabel: string) => {
        const imageNode: ImageNode = world.recallNode(imageLabel)
        const partnerNode: BaseNode = world.recallNode(partnerNodeLabel)

        const response = await axios
            .post(`${process.env.API_URL}/images/${imageNode.id}/belongs-to-node/${partnerNode.id}`)
            .catch(error => {
                console.error(error)
            })

        world.rememberRelationship(response?.data, relationshipLabel)
    })
