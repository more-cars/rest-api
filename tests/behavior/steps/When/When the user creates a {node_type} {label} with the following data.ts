import {DataTable, When, world} from "@cucumber/cucumber"
import {getBasePathFragmentForNodeType} from "../../lib/getBasePathFragmentForNodeType"
import {performApiRequest} from "../../lib/performApiRequest"
import {NodeManager} from "../../lib/NodeManager"

When('the user (tries to )create(s) a {string} {string} with the following data',
    async (nodeType: string, label: string, dataTable: DataTable) => {
        const rows = dataTable.hashes()

        const data: any = {}
        rows.forEach((row) => {
            switch (row.datatype) {
                case 'string':
                    data[row.key] = row.value
                    break
                case 'number':
                    data[row.key] = parseFloat(row.value)
                    break
                case 'boolean':
                    data[row.key] = (row.value.toLowerCase() === 'true')
                    break
            }
        })

        const nodePath = getBasePathFragmentForNodeType(nodeType)
        const path = `/${nodePath}`

        const response = await performApiRequest(path, 'POST', data)
        world.rememberResponse(response)
        NodeManager.cacheNode(nodeType, label, response.body.data)
    })
