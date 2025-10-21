import {expect, test} from 'vitest'
import {deleteAllTrackLayouts} from "../../../../_toolbox/dbSeeding/track-layouts/nodes/deleteAllTrackLayouts"
import {TrackLayoutNode} from "../../../../../src/db/nodes/track-layouts/types/TrackLayoutNode"
import {seedTrackLayouts} from "../../../../_toolbox/dbSeeding/track-layouts/nodes/seedTrackLayouts"
import {getAllNodesOfType} from "../../../../../src/db/nodes/track-layouts/getAllNodesOfType"

test('When there are no TRACK LAYOUTS then an empty array should be returned', async () => {
    await deleteAllTrackLayouts()

    const expectedTrackLayouts: Array<TrackLayoutNode> = []
    const actualTrackLayouts = await getAllNodesOfType()

    expect(actualTrackLayouts)
        .toEqual(expectedTrackLayouts)
})

test('When TRACK LAYOUTS exist then all of them should be returned', async () => {
    await deleteAllTrackLayouts()
    const amount = Math.ceil(Math.random() * 50)
    await seedTrackLayouts(amount)

    const actualTrackLayouts = await getAllNodesOfType()

    expect(actualTrackLayouts.length)
        .toEqual(amount)
})
