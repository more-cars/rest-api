import {When} from "@cucumber/cucumber"
import {NodeManager} from "../../lib/NodeManager"
import {performApiRequest} from "../../lib/performApiRequest"

When('the user requests the NODE {string}',
    async (label: string) => {
        const node = NodeManager.getNodeByLabel(label)
        const path = `/nodes/${node.fields.id}`

        await performApiRequest(path, 'GET')
    })
