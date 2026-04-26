import {DataTable, When} from "@cucumber/cucumber"
import {getNodeTypeSpecification} from "../../../../src/specification/getNodeTypeSpecification"
import {convertStringToNodeType} from "../../../_toolbox/convertStringToNodeType"
import {getBasePathFragmentForNodeType} from "../../lib/getBasePathFragmentForNodeType"
import {performApiRequest} from "../../lib/performApiRequest"
import {NodeManager} from "../../lib/NodeManager"
import {convertNodeResponseToNode} from "../../lib/convertNodeResponseToNode"

When('the user creates a {string} {string} with the following data',
    async (nodeType: string, nodeLabel: string, dataTable: DataTable) => {
        const rows = dataTable.hashes()
        const specs = getNodeTypeSpecification(convertStringToNodeType(nodeType))

        const data: any = {}
        rows.forEach((row) => {
            const spec = specs.properties.find(prop => prop.name === row.key)
            if (!spec) {
                data[row.key] = Number(row.value) ? Number(row.value) : row.value
                return
            }

            switch (spec.datatype) {
                case 'string':
                    data[row.key] = row.value
                    break
                case 'number':
                    data[row.key] = row.value === undefined ? null : parseFloat(row.value)
                    break
                case 'boolean':
                    data[row.key] = (row.value.toLowerCase() === 'true')
                    break
            }
        })

        const nodePath = getBasePathFragmentForNodeType(nodeType)
        const path = `/${nodePath}`

        const response = await performApiRequest(path, 'POST', data)
        if (response.status_code < 400) {
            NodeManager.cacheNode(convertNodeResponseToNode(response.body), nodeLabel)
        }
    })
