import {When, world} from "@cucumber/cucumber"
import axios from "axios"
import {ImageNode} from "../../../src/models/images/types/ImageNode"

When('the user tries to request a grouped list of all relationships for the IMAGE {string}',
    async (imageLabel: string) => {
        const image: ImageNode = world.recallNode(imageLabel)

        const response = await axios
            .get(`${process.env.API_URL}/images/${image.id}/belongs-to-node-type`, {
                validateStatus: function (status) {
                    return status === 404 // treating 404 as a "good" status code, so axios does not fail the request
                }
            })
            .catch(error => {
                console.error(error)
            })

        world.rememberResponse(response)
    })
