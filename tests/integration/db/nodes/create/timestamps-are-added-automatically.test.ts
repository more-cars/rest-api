import {describe, expect, test} from 'vitest'
import {createNeo4jNode} from "../../../../../src/db/nodes/createNeo4jNode"
import {getAllExpectedNodeTypes} from "../../../../_toolbox/getAllExpectedNodeTypes"
import {convertStringToDbNodeType} from "../../../../_toolbox/convertStringToNodeType"
import {getFakeNode} from "../../../../_toolbox/fixtures/nodes/getFakeNode"
import type {InputNodeTypeCreate} from "../../../../../src/db/types/InputNodeTypeCreate"

describe('Timestamps are automatically added when creating a node', () => {
    test.each(
        getAllExpectedNodeTypes()
    )('$0', async (nodeType) => {
        if (!nodeType) {
            return
        }

        const dbNodeType = convertStringToDbNodeType(nodeType)
        const nodeData = getFakeNode(nodeType).dbInputMinimal as InputNodeTypeCreate
        const createdNode = await createNeo4jNode(dbNodeType, nodeData)

        expect(createdNode.properties)
            .toHaveProperty('created_at')
        expect(createdNode.properties)
            .toHaveProperty('updated_at')
    })
})
