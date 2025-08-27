import {When, world} from "@cucumber/cucumber"
import axios from "axios"
import {ImageNode} from "../../../src/models/images/types/ImageNode"

When('the user requests all relationships for IMAGE {string}',
    async (imageLabel: string) => {
        const imageNode: ImageNode = world.recallNode(imageLabel).data

        const response = await axios
            .get(`${process.env.API_URL}/images/${imageNode.id}/belongs-to-node`)
            .catch(error => {
                console.error(error)
            })

        world.rememberResponse(response)
    })
