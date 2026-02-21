import {expect, test} from 'vitest'
import {deleteAllNodesOfType} from "../../../../_toolbox/dbSeeding/deleteAllNodesOfType"
import {ControllerNodeType} from "../../../../../src/controllers/nodes/types/ControllerNodeType"
import {TrackLayoutNode} from "../../../../../src/db/nodes/track-layouts/types/TrackLayoutNode"
import {seedNodes} from "../../../../_toolbox/dbSeeding/seedNodes"
import {getAllNodesOfType} from "../../../../../src/db/nodes/track-layouts/getAllNodesOfType"

test('When there are no TRACK LAYOUTS then an empty array should be returned', async () => {
    await deleteAllNodesOfType(ControllerNodeType.TrackLayout)

    const expectedTrackLayouts: TrackLayoutNode[] = []
    const actualTrackLayouts = await getAllNodesOfType()

    expect(actualTrackLayouts)
        .toEqual(expectedTrackLayouts)
})

test('When TRACK LAYOUTS exist then all of them should be returned', async () => {
    await deleteAllNodesOfType(ControllerNodeType.TrackLayout)
    const amount = Math.ceil(Math.random() * 50)
    await seedNodes(ControllerNodeType.TrackLayout, amount)

    const actualTrackLayouts = await getAllNodesOfType()

    expect(actualTrackLayouts.length)
        .toEqual(amount)
})
