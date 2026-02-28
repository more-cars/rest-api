import {When} from "@cucumber/cucumber"
import {NodeManager} from "../../lib/NodeManager"
import {performApiRequest} from "../../lib/performApiRequest"

When('the user requests all relationships for IMAGE {string}',
    async (imageLabel: string) => {
        const imageNode = NodeManager.getNodeByLabel(imageLabel)
        const path = `/images/${imageNode.fields.id}/belongs-to-node`

        await performApiRequest(path, 'GET')
    })
