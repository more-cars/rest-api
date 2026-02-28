import {When, world} from "@cucumber/cucumber"
import {NodeManager} from "../../lib/NodeManager"
import {performApiRequest} from "../../lib/performApiRequest"

When('the user requests all relationships for IMAGE {string}',
    async (imageLabel: string) => {
        const imageNode = NodeManager.getNodeByLabel(imageLabel)
        const path = `/images/${imageNode.fields.id}/belongs-to-node`

        const response = await performApiRequest(path, 'GET')
        world.rememberResponse(response)
    })
