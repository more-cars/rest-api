import {describe, expect, test} from 'vitest'
import {deleteAllTrackLayouts} from "../../../../../_toolbox/dbSeeding/track-layouts/nodes/deleteAllTrackLayouts"
import type {TrackLayoutNode} from "../../../../../../src/models/track-layouts/types/TrackLayoutNode"
import {TrackLayout} from "../../../../../../src/models/track-layouts/TrackLayout"
import {seedTrackLayouts} from "../../../../../_toolbox/dbSeeding/track-layouts/nodes/seedTrackLayouts"

describe('Each page of a "get all TRACK LAYOUT nodes" request returns the correct number of nodes', () => {
    test.each([
        [1],
        [2],
        [99],
    ])('when there exist NO track layout nodes (page=$0)', async (page) => {
        await deleteAllTrackLayouts()

        const expectedNodes: Array<TrackLayoutNode> = []
        const actualNodes = await TrackLayout.findAll({page})

        expect(actualNodes)
            .toEqual(expectedNodes)
    })

    test.each([
        [20, 1, 20],
        [5, 2, 0],
    ])('when there exist $0 track layout nodes (page=$1)', async (totalNodeAmount, page, expectedNodeAmountOnPage) => {
        await deleteAllTrackLayouts()
        await seedTrackLayouts(totalNodeAmount)

        const actualNodes = await TrackLayout.findAll({page})

        expect(actualNodes.length)
            .toEqual(expectedNodeAmountOnPage)
    })
})
