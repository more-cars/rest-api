import {describe, expect, test} from 'vitest'
import {deleteAllNodesOfType} from "../../../../../_toolbox/dbSeeding/deleteAllNodesOfType"
import {ControllerNodeType} from "../../../../../../src/controllers/nodes/types/ControllerNodeType"
import type {ImageNode} from "../../../../../../src/models/node-types/images/types/ImageNode"
import {Image} from "../../../../../../src/models/node-types/images/Image"
import {seedNodes} from "../../../../../_toolbox/dbSeeding/seedNodes"
import {DbNodeType} from "../../../../../../src/db/types/DbNodeType"

describe('Each page of a "get all IMAGE nodes" request returns the correct number of nodes', () => {
    test.each([
        [1],
        [2],
        [99],
    ])('when there exist no IMAGE nodes (page=$0)', async (page) => {
        await deleteAllNodesOfType(DbNodeType.Image)

        const expectedNodes: ImageNode[] = []
        const actualNodes = await Image.findAll({page})

        expect(actualNodes)
            .toEqual(expectedNodes)
    })

    test.each([
        [20, 1, 20],
        [5, 2, 0],
    ])('when there exist $0 IMAGE nodes (page=$1)', async (totalNodeAmount, page, expectedNodeAmountOnPage) => {
        await deleteAllNodesOfType(DbNodeType.Image)
        await seedNodes(DbNodeType.Image, totalNodeAmount)

        const actualNodes = await Image.findAll({page})

        expect(actualNodes.length)
            .toEqual(expectedNodeAmountOnPage)
    })
})
