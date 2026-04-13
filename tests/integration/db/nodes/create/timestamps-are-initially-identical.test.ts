import {describe, expect, test} from 'vitest'
import {getAllExpectedNodeTypes} from "../../../../_toolbox/getAllExpectedNodeTypes"
import {createNeo4jNode} from "../../../../../src/db/nodes/createNeo4jNode"
import {convertStringToDbNodeType} from "../../../../_toolbox/convertStringToNodeType"
import {getFakeNode} from "../../../../_toolbox/fixtures/nodes/getFakeNode"
import type {InputNodeTypeCreate} from "../../../../../src/db/types/InputNodeTypeCreate"

describe('Both timestamps are identical for new nodes', () => {
    test.each(
        getAllExpectedNodeTypes()
    )('$0', async (nodeType) => {
        if (!nodeType) {
            return
        }

        const dbNodeType = convertStringToDbNodeType(nodeType)
        const nodeData = getFakeNode(nodeType).dbInputMinimal as InputNodeTypeCreate
        const createdNode = await createNeo4jNode(dbNodeType, nodeData)

        expect(createdNode.properties.created_at)
            .toEqual(createdNode.properties.updated_at)
    })
})
