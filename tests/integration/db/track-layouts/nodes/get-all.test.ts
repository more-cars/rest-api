import {expect, test} from 'vitest'
import {deleteAllNodesOfType} from "../../../../_toolbox/dbSeeding/deleteAllNodesOfType"
import {DbNodeType} from "../../../../../src/db/types/DbNodeType"
import {TrackLayoutNode} from "../../../../../src/db/node-types/track-layouts/types/TrackLayoutNode"
import {seedNodes} from "../../../../_toolbox/dbSeeding/seedNodes"
import {getAllNodesOfType} from "../../../../../src/db/node-types/track-layouts/getAllNodesOfType"

test('When there are no TRACK LAYOUTS then an empty array should be returned', async () => {
    await deleteAllNodesOfType(DbNodeType.TrackLayout)

    const expectedTrackLayouts: TrackLayoutNode[] = []
    const actualTrackLayouts = await getAllNodesOfType()

    expect(actualTrackLayouts)
        .toEqual(expectedTrackLayouts)
})

test('When TRACK LAYOUTS exist then all of them should be returned', async () => {
    await deleteAllNodesOfType(DbNodeType.TrackLayout)
    const amount = Math.ceil(Math.random() * 20)
    await seedNodes(DbNodeType.TrackLayout, amount)

    const actualTrackLayouts = await getAllNodesOfType()

    expect(actualTrackLayouts.length)
        .toEqual(amount)
})
