import {When, world} from "@cucumber/cucumber"
import axios from "axios"
import {ImageNode} from "../../../src/models/images/types/ImageNode"

When('the user tries to request all relationships for IMAGE {string}',
    async (imageLabel: string) => {
        const imageNode: ImageNode = world.recallNode(imageLabel)

        const response = await axios
            .get(`${process.env.API_URL}/images/${imageNode.id}/belongs-to-node`, {
                validateStatus: function (status) {
                    return status === 404 // treating 404 as a "good" status code, so axios does not fail the request
                }
            })
            .catch(error => {
                console.error(error)
            })

        world.rememberResponse(response)
    })
