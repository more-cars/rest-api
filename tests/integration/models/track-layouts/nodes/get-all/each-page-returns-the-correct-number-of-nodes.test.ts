import {describe, expect, test} from 'vitest'
import {deleteAllNodesOfType} from "../../../../../_toolbox/dbSeeding/deleteAllNodesOfType"
import type {TrackLayoutNode} from "../../../../../../src/models/node-types/track-layouts/types/TrackLayoutNode"
import {TrackLayout} from "../../../../../../src/models/node-types/track-layouts/TrackLayout"
import {seedNodes} from "../../../../../_toolbox/dbSeeding/seedNodes"
import {DbNodeType} from "../../../../../../src/db/types/DbNodeType"

describe('Each page of a "get all TRACK LAYOUT nodes" request returns the correct number of nodes', () => {
    test.each([
        [1],
        [2],
        [99],
    ])('when there exist no TRACK LAYOUT nodes (page=$0)', async (page) => {
        await deleteAllNodesOfType(DbNodeType.TrackLayout)

        const expectedNodes: TrackLayoutNode[] = []
        const actualNodes = await TrackLayout.findAll({page})

        expect(actualNodes)
            .toEqual(expectedNodes)
    })

    test.each([
        [20, 1, 20],
        [5, 2, 0],
    ])('when there exist $0 TRACK LAYOUT nodes (page=$1)', async (totalNodeAmount, page, expectedNodeAmountOnPage) => {
        await deleteAllNodesOfType(DbNodeType.TrackLayout)
        await seedNodes(DbNodeType.TrackLayout, totalNodeAmount)

        const actualNodes = await TrackLayout.findAll({page})

        expect(actualNodes.length)
            .toEqual(expectedNodeAmountOnPage)
    })
})
