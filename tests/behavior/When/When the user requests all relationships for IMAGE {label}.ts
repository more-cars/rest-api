import {When} from "@cucumber/cucumber"
import axios from "axios"
import {ImageNode} from "../../../src/models/images/types/ImageNode"

When('the user requests all relationships for IMAGE {string}',
    async function (imageLabel: string) {
        const imageNode: ImageNode = this.image[imageLabel]

        this.latestResponse = await axios
            .get(`${process.env.API_URL}/images/${imageNode.id}/belongs-to-node`)
            .catch(error => {
                console.error(error)
            })
    })
