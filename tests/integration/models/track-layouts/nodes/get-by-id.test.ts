import {describe, expect, test} from 'vitest'
import {TrackLayout} from "../../../../../src/models/node-types/track-layouts/TrackLayout"
import {seedNode} from "../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../src/db/types/DbNodeType"
import {NodeNotFoundError} from "../../../../../src/models/types/NodeNotFoundError"

describe('Fetching a TRACK LAYOUT', () => {
    test('which does not exist', async () => {
        await expect(TrackLayout.findById(-42))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('which exists', async () => {
        const expectedTrackLayout = await seedNode(DbNodeType.TrackLayout)
        const actualTrackLayout = await TrackLayout.findById(expectedTrackLayout.properties.id)

        expect(actualTrackLayout.attributes)
            .toEqual(expectedTrackLayout.properties)
    })
})
