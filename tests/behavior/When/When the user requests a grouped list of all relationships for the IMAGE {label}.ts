import {When} from "@cucumber/cucumber"
import axios from "axios"
import {ImageNode} from "../../../src/models/images/types/ImageNode"

When('the user requests a grouped list of all relationships for the IMAGE {string}',
    async function (imageLabel: string) {
        const image: ImageNode = this.image[imageLabel]

        this.latestResponse = await axios
            .get(`${process.env.API_URL}/images/${image.id}/belongs-to-node-type`)
            .catch(error => {
                console.error(error)
            })
    })
