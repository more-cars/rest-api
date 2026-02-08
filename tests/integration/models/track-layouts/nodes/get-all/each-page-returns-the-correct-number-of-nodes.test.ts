import {describe, expect, test} from 'vitest'
import {deleteAllNodesOfType} from "../../../../../_toolbox/dbSeeding/deleteAllNodesOfType"
import {NodeTypeEnum} from "../../../../../../src/controllers/nodes/types/NodeTypeEnum"
import type {TrackLayoutNode} from "../../../../../../src/models/track-layouts/types/TrackLayoutNode"
import {TrackLayout} from "../../../../../../src/models/track-layouts/TrackLayout"
import {seedNodes} from "../../../../../_toolbox/dbSeeding/seedNodes"

describe('Each page of a "get all TRACK LAYOUT nodes" request returns the correct number of nodes', () => {
    test.each([
        [1],
        [2],
        [99],
    ])('when there exist NO track layout nodes (page=$0)', async (page) => {
        await deleteAllNodesOfType(NodeTypeEnum.TRACK_LAYOUT)

        const expectedNodes: Array<TrackLayoutNode> = []
        const actualNodes = await TrackLayout.findAll({page})

        expect(actualNodes)
            .toEqual(expectedNodes)
    })

    test.each([
        [20, 1, 20],
        [5, 2, 0],
    ])('when there exist $0 track layout nodes (page=$1)', async (totalNodeAmount, page, expectedNodeAmountOnPage) => {
        await deleteAllNodesOfType(NodeTypeEnum.TRACK_LAYOUT)
        await seedNodes(NodeTypeEnum.TRACK_LAYOUT, totalNodeAmount)

        const actualNodes = await TrackLayout.findAll({page})

        expect(actualNodes.length)
            .toEqual(expectedNodeAmountOnPage)
    })
})
