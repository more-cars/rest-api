import {describe, expect, test} from 'vitest'
import {getAllExpectedNodeTypes} from "../../../../_toolbox/getAllExpectedNodeTypes"
import {createDbNode} from "../../../../../src/db/nodes/createDbNode"
import {convertStringToDbNodeType} from "../../../../_toolbox/convertStringToNodeType"
import {getFakeNode} from "../../../../_toolbox/fixtures/nodes/getFakeNode"
import type {DbInputData} from "../../../../../src/db/types/DbInputData"
import {updateDbNode} from "../../../../../src/db/nodes/updateDbNode"

describe('updated_at timestamp is updated when updating a node', () => {
    test.each(
        getAllExpectedNodeTypes()
    )('$0', async (nodeType) => {
        if (!nodeType) {
            return
        }

        const dbNodeType = convertStringToDbNodeType(nodeType)
        const nodeData = getFakeNode(nodeType).dbInputMinimal() as DbInputData
        const createdNode = await createDbNode(dbNodeType, nodeData)
        const updatedNode = await updateDbNode(dbNodeType, createdNode.properties.id, nodeData)

        expect(updatedNode.properties.created_at)
            .not.toEqual(updatedNode.properties.updated_at)
    })
})
