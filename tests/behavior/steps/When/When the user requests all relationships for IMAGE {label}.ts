import {When, world} from "@cucumber/cucumber"
import {ImageNode} from "../../../../src/models/node-types/images/types/ImageNode"
import {performApiRequest} from "../../lib/performApiRequest"

When('the user requests all relationships for IMAGE {string}',
    async (imageLabel: string) => {
        const imageNode: ImageNode = world.recallNode(imageLabel).data
        const path = `/images/${imageNode.attributes.id}/belongs-to-node`

        const response = await performApiRequest(path, 'GET')
        world.rememberResponse(response)
    })
