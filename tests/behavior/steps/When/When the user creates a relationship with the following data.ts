import {DataTable, When, world} from "@cucumber/cucumber"
import {NodeManager} from "../../lib/NodeManager"
import {NodeType} from "../../../../src/specification/NodeType"
import {performApiRequest} from "../../lib/performApiRequest"

When('the user creates a relationship with the following data',
    async (dataTable: DataTable) => {
        const startNode = await NodeManager.createNode(NodeType.Brand, '')
        const endNode = await NodeManager.createNode(NodeType.CarModel, '')
        const data: any = {}

        const rows = dataTable.hashes()
        rows.forEach((row) => {
            data[row.key] = row.value
        })

        const path = `/brands/${startNode.fields.id}/has-car-model/${endNode.fields.id}`

        const response = await performApiRequest(path, 'POST', data)
        world.rememberResponse(response)
    })
