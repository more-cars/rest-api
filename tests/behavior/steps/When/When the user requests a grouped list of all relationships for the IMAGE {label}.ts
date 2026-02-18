import {When, world} from "@cucumber/cucumber"
import axios from "axios"
import {ImageNode} from "../../../../src/models/node-types/images/types/ImageNode"

When('the user requests a grouped list of all relationships for the IMAGE {string}',
    async (imageLabel: string) => {
        const image: ImageNode = world.recallNode(imageLabel).data

        const response = await axios
            .get(`${process.env.API_URL}/images/${image.id}/belongs-to-node-type`)
            .catch(error => {
                console.error(error)
            })

        world.rememberResponse(response)
    })
