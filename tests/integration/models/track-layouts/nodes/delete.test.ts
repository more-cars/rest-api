import {describe, expect, test} from 'vitest'
import {TrackLayout} from "../../../../../src/models/track-layouts/TrackLayout"
import {seedTrackLayout} from "../../../../_toolbox/dbSeeding/track-layouts/nodes/seedTrackLayout"
import {NodeNotFoundError} from "../../../../../src/models/types/NodeNotFoundError"

describe('Deleting a TRACK LAYOUT', () => {
    test('that does not exist', async () => {
        await expect(TrackLayout.delete(-42))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('that exists', async () => {
        const node = await seedTrackLayout()
        await expect(TrackLayout.delete(node.id))
            .resolves
            .not.toThrow(NodeNotFoundError)
    })
})
