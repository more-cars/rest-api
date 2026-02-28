import {When} from "@cucumber/cucumber"
import {performApiRequest} from "../../lib/performApiRequest"
import {NodeManager} from "../../lib/NodeManager"

When('the user requests a grouped list of all relationships for the IMAGE {string}',
    async (imageLabel: string) => {
        const image = NodeManager.getNodeByLabel(imageLabel)
        const path = `/images/${image.fields.id}/belongs-to-node-type`

        await performApiRequest(path, 'GET')
    })
