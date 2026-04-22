import {describe, expect, test} from 'vitest'
import {convertStringToDbNodeType} from "../../../../_toolbox/convertStringToNodeType"
import {getFakeNode} from "../../../../_toolbox/fixtures/nodes/getFakeNode"
import type {InputNodeTypeCreate} from "../../../../../src/db/types/InputNodeTypeCreate"
import {createNeo4jNode} from "../../../../../src/db/nodes/createNeo4jNode"
import {getAllExpectedNodeTypes} from "../../../../_toolbox/getAllExpectedNodeTypes"

describe('ID is automatically added when creating a node', () => {
    test.each(
        getAllExpectedNodeTypes()
    )('$0', async (nodeType) => {
        if (!nodeType) {
            return
        }

        const dbNodeType = convertStringToDbNodeType(nodeType)
        const nodeData = getFakeNode(nodeType).dbInputMinimal as InputNodeTypeCreate
        const createdNode = await createNeo4jNode(dbNodeType, nodeData)

        expect(createdNode.properties.id)
            .toBeGreaterThanOrEqual(12000000)
        expect(createdNode.properties.id)
            .toBeLessThanOrEqual(99999999)
    })
})
