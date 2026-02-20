import {expect, test} from 'vitest'
import {TrackLayout} from "../../../../../src/models/node-types/track-layouts/TrackLayout"
import {seedNode} from "../../../../_toolbox/dbSeeding/seedNode"
import {ControllerNodeType} from "../../../../../src/controllers/nodes/types/ControllerNodeType"

test('Fetching a TRACK LAYOUT that does not exist should return "false"', async () => {
    const expectedTrackLayout = false
    const actualTrackLayout = await TrackLayout.findById(-42)

    expect(actualTrackLayout)
        .toEqual(expectedTrackLayout)
})

test('When the TRACK LAYOUT exists it should be returned', async () => {
    const expectedTrackLayout = await seedNode(ControllerNodeType.TRACK_LAYOUT)
    const actualTrackLayout = await TrackLayout.findById(expectedTrackLayout.id)

    expect(actualTrackLayout)
        .toEqual(expectedTrackLayout)
})
