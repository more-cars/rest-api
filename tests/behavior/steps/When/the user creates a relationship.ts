import {When} from "@cucumber/cucumber"
import {performApiRequest} from "../../lib/performApiRequest"
import {NodeManager} from "../../lib/NodeManager"
import {NodeType} from "../../../../src/specification/NodeType"

When('the user creates a relationship',
    async () => {
        const startNode = await NodeManager.createNode(NodeType.Brand, '')
        const endNode = await NodeManager.createNode(NodeType.CarModel, '')

        const path = `/brands/${startNode.fields.id}/has-car-model/${endNode.fields.id}`

        await performApiRequest(path, 'POST')
    })
