import {When, world} from "@cucumber/cucumber"
import {performApiRequest} from "../../lib/performApiRequest"

When('the user requests a grouped list of all relationships for the IMAGE {string}',
    async (imageLabel: string) => {
        const image = world.recallNode(imageLabel).data
        const path = `/images/${image.properties.id}/belongs-to-node-type`

        const response = await performApiRequest(path, 'GET')
        world.rememberResponse(response)
    })
