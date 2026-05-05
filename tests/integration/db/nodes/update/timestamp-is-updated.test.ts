import {describe, expect, test} from 'vitest'
import {getAllExpectedNodeTypes} from "../../../../_toolbox/getAllExpectedNodeTypes"
import {createNeo4jNode} from "../../../../../src/db/nodes/createNeo4jNode"
import {convertStringToDbNodeType} from "../../../../_toolbox/convertStringToNodeType"
import {getFakeNode} from "../../../../_toolbox/fixtures/nodes/getFakeNode"
import type {InputNodeTypeCreate} from "../../../../../src/db/types/InputNodeTypeCreate"
import {updateDbNode} from "../../../../../src/db/nodes/updateDbNode"

describe('updated_at timestamp is updated when updating a node', () => {
    test.each(
        getAllExpectedNodeTypes()
    )('$0', async (nodeType) => {
        if (!nodeType) {
            return
        }

        const dbNodeType = convertStringToDbNodeType(nodeType)
        const nodeData = getFakeNode(nodeType).dbInputMinimal as InputNodeTypeCreate
        const createdNode = await createNeo4jNode(dbNodeType, nodeData)
        const updatedNode = await updateDbNode(dbNodeType, createdNode.properties.id, nodeData)

        expect(updatedNode.properties.created_at)
            .not.toEqual(updatedNode.properties.updated_at)
    })
})
