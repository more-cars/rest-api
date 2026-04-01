import {DataTable, When} from "@cucumber/cucumber"
import {NodeManager} from "../../lib/NodeManager"
import {performApiRequest} from "../../lib/performApiRequest"

When('the user requests the prime images for the following nodes',
    async (dataTable: DataTable) => {
        const rows = dataTable.hashes()
        const nodeIds: number[] = []

        rows.forEach((row) => {
            const node = NodeManager.getNodeByLabel(row.node)
            nodeIds.push(node.fields.id)
        })

        const path = `/nodes/${nodeIds.join(',')}/has-prime-image`

        await performApiRequest(path, 'GET')
    })
