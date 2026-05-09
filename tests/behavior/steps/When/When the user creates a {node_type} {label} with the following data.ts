import {DataTable, When} from "@cucumber/cucumber"
import {getBasePathFragmentForNodeType} from "../../lib/getBasePathFragmentForNodeType"
import {performApiRequest} from "../../lib/performApiRequest"
import {NodeManager} from "../../lib/NodeManager"
import {convertNodeResponseToNode} from "../../lib/convertNodeResponseToNode"

When('the user creates a {string} {string} with the following data',
    async (nodeType: string, nodeLabel: string, dataTable: DataTable) => {
        const data: any = {}

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

        const nodePath = getBasePathFragmentForNodeType(nodeType)
        const path = `/${nodePath}`

        const response = await performApiRequest(path, 'POST', data)
        if (response.status_code < 400) {
            NodeManager.cacheNode(convertNodeResponseToNode(response.body), nodeLabel)
        }
    })
