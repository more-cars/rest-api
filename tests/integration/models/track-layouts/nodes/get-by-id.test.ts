import {expect, test} from 'vitest'
import {TrackLayout} from "../../../../../src/models/track-layouts/TrackLayout"
import {seedNode} from "../../../../_toolbox/dbSeeding/seedNode"
import {NodeTypeEnum} from "../../../../../src/controllers/nodes/types/NodeTypeEnum"
import {TrackLayoutNode} from "../../../../../src/db/nodes/track-layouts/types/TrackLayoutNode"

test('Fetching a TRACK LAYOUT that does not exist should return "false"', async () => {
    const expectedTrackLayout = false
    const actualTrackLayout = await TrackLayout.findById(-42)

    expect(actualTrackLayout)
        .toEqual(expectedTrackLayout)
})

test('When the TRACK LAYOUT exists it should be returned', async () => {
    const expectedTrackLayout = await seedNode(NodeTypeEnum.TRACK_LAYOUT) as TrackLayoutNode
    const actualTrackLayout = await TrackLayout.findById(expectedTrackLayout.id)

    expect(actualTrackLayout)
        .toEqual(expectedTrackLayout)
})
