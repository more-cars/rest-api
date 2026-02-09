import {describe, expect, test} from 'vitest'
import {deleteAllNodesOfType} from "../../../../../_toolbox/dbSeeding/deleteAllNodesOfType"
import {NodeTypeEnum} from "../../../../../../src/controllers/nodes/types/NodeTypeEnum"
import type {ImageNode} from "../../../../../../src/models/images/types/ImageNode"
import {Image} from "../../../../../../src/models/images/Image"
import {seedNodes} from "../../../../../_toolbox/dbSeeding/seedNodes"

describe('Each page of a "get all IMAGE nodes" request returns the correct number of nodes', () => {
    test.each([
        [1],
        [2],
        [99],
    ])('when there exist no IMAGE nodes (page=$0)', async (page) => {
        await deleteAllNodesOfType(NodeTypeEnum.IMAGE)

        const expectedNodes: ImageNode[] = []
        const actualNodes = await Image.findAll({page})

        expect(actualNodes)
            .toEqual(expectedNodes)
    })

    test.each([
        [20, 1, 20],
        [5, 2, 0],
    ])('when there exist $0 IMAGE nodes (page=$1)', async (totalNodeAmount, page, expectedNodeAmountOnPage) => {
        await deleteAllNodesOfType(NodeTypeEnum.IMAGE)
        await seedNodes(NodeTypeEnum.IMAGE, totalNodeAmount)

        const actualNodes = await Image.findAll({page})

        expect(actualNodes.length)
            .toEqual(expectedNodeAmountOnPage)
    })
})
