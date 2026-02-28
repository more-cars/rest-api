import {When} from "@cucumber/cucumber"
import {NodeManager} from "../../lib/NodeManager"
import {getBasePathFragmentForNodeType} from "../../lib/getBasePathFragmentForNodeType"
import {performApiRequest} from "../../lib/performApiRequest"
import {RelationshipManager} from "../../lib/RelationshipManager"

When('the user creates a set of {int} relationships {string}',
    async (amount: number, label: string) => {
        const relationships = []

        for (let i = 0; i < amount; ++i) {
            const startNode = await NodeManager.createNode('brand', '')
            const endNode = await NodeManager.createNode('car model', '')
            const nodePath = getBasePathFragmentForNodeType(startNode.node_type)
            const path = `/${nodePath}/${startNode.fields.id}/has-car-model/${endNode.fields.id}`

            const response = await performApiRequest(path, 'POST')
            relationships.push(response.body)
        }

        RelationshipManager.cacheRelationshipCollection(relationships, label)
    })
