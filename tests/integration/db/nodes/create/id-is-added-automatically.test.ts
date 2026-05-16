import {describe, expect, test} from 'vitest'
import {convertStringToDbNodeType} from "../../../../_toolbox/convertStringToNodeType"
import {getFakeNode} from "../../../../_toolbox/fixtures/nodes/getFakeNode"
import type {DbInputData} from "../../../../../src/db/types/DbInputData"
import {createDbNode} from "../../../../../src/db/nodes/createDbNode"
import {getAllExpectedNodeTypes} from "../../../../_toolbox/getAllExpectedNodeTypes"

describe('ID is automatically added when creating a node', () => {
    test.each(
        getAllExpectedNodeTypes()
    )('$0', async (nodeType) => {
        if (!nodeType) {
            return
        }

        const dbNodeType = convertStringToDbNodeType(nodeType)
        const nodeData = getFakeNode(nodeType).dbInputMinimal() as DbInputData
        const createdNode = await createDbNode(dbNodeType, nodeData)

        expect(createdNode.properties.id)
            .toBeGreaterThanOrEqual(12000000)
        expect(createdNode.properties.id)
            .toBeLessThanOrEqual(99999999)
    })
})
