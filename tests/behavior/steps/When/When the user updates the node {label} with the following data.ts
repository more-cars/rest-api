import {DataTable, When} from "@cucumber/cucumber"
import {getBasePathFragmentForNodeType} from "../../lib/getBasePathFragmentForNodeType"
import {performApiRequest} from "../../lib/performApiRequest"
import {NodeManager} from "../../lib/NodeManager"

When('the user updates the node {string} with the following data',
    async (nodeLabel: string, dataTable: DataTable) => {
        const data: Record<string, string | number | boolean | null> = {}

        const properties = dataTable.hashes()
        properties.forEach((property) => {
            if (property.value === '') {
                data[property.key] = null
            } else if (!isNaN(Number(property.value))) {
                data[property.key] = Number(property.value)
            } else {
                data[property.key] = property.value
            }
        })

        const node = NodeManager.getNodeByLabel(nodeLabel)
        const nodePath = getBasePathFragmentForNodeType(node.node_type)
        const path = `/${nodePath}/${node.fields.id}`

        await performApiRequest(path, 'PATCH', data)
    })
