import {describe, expect, test} from 'vitest'
import {deleteAllNodesOfType} from "../../../../../_toolbox/dbSeeding/deleteAllNodesOfType"
import {NodeTypeEnum} from "../../../../../../src/controllers/nodes/types/NodeTypeEnum"
import type {ImageNode} from "../../../../../../src/models/images/types/ImageNode"
import {Image} from "../../../../../../src/models/images/Image"
import {seedNodes} from "../../../../../_toolbox/dbSeeding/seedNodes"

describe('A non-parametrized "get all COMPANY nodes" request returns the correct number of nodes', () => {
    test('when there exist NO company nodes', async () => {
        await deleteAllNodesOfType(NodeTypeEnum.IMAGE)

        const expectedNodes: Array<ImageNode> = []
        const actualNodes = await Image.findAll()

        expect(actualNodes)
            .toEqual(expectedNodes)
    })

    test('when there exist company nodes', async () => {
        await deleteAllNodesOfType(NodeTypeEnum.IMAGE)
        const amount = Math.ceil(Math.random() * 20)
        await seedNodes(NodeTypeEnum.IMAGE, amount)

        const actualNodes = await Image.findAll()

        expect(actualNodes.length)
            .toEqual(amount)
    })
})
