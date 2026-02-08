import {describe, expect, test} from 'vitest'
import {deleteAllNodesOfType} from "../../../../../_toolbox/dbSeeding/deleteAllNodesOfType"
import {NodeTypeEnum} from "../../../../../../src/controllers/nodes/types/NodeTypeEnum"
import type {TrackLayoutNode} from "../../../../../../src/models/track-layouts/types/TrackLayoutNode"
import {TrackLayout} from "../../../../../../src/models/track-layouts/TrackLayout"
import {seedTrackLayouts} from "../../../../../_toolbox/dbSeeding/track-layouts/nodes/seedTrackLayouts"

describe('A non-parametrized "get all TRACK LAYOUT nodes" request returns the correct number of nodes', () => {
    test('when there exist NO track layout nodes', async () => {
        await deleteAllNodesOfType(NodeTypeEnum.TRACK_LAYOUT)

        const expectedNodes: Array<TrackLayoutNode> = []
        const actualNodes = await TrackLayout.findAll()

        expect(actualNodes)
            .toEqual(expectedNodes)
    })

    test('when there exist track layout nodes', async () => {
        await deleteAllNodesOfType(NodeTypeEnum.TRACK_LAYOUT)
        const amount = Math.ceil(Math.random() * 20)
        await seedTrackLayouts(amount)

        const actualNodes = await TrackLayout.findAll()

        expect(actualNodes.length)
            .toEqual(amount)
    })
})
