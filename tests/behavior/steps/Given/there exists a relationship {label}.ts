import {When} from "@cucumber/cucumber"
import {NodeManager} from "../../lib/NodeManager"
import {getBasePathFragmentForNodeType} from "../../lib/getBasePathFragmentForNodeType"
import {performApiRequest} from "../../lib/performApiRequest"
import {RelationshipManager} from "../../lib/RelationshipManager"

When('there exists a relationship {string}',
    async (label: string) => {
        const startNode = await NodeManager.createNode('brand', '')
        const endNode = await NodeManager.createNode('car model', '')
        const nodePath = getBasePathFragmentForNodeType(startNode.node_type)
        const path = `/${nodePath}/${startNode.fields.id}/has-car-model/${endNode.fields.id}`

        const response = await performApiRequest(path, 'POST')
        RelationshipManager.cacheRelationship(response.body, label)
    })
