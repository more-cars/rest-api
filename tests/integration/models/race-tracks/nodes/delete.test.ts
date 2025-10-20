import {describe, expect, test} from 'vitest'
import {RaceTrack} from "../../../../../src/models/race-tracks/RaceTrack"
import {seedRaceTrack} from "../../../../_toolbox/dbSeeding/race-tracks/nodes/seedRaceTrack"
import {NodeNotFoundError} from "../../../../../src/models/types/NodeNotFoundError"

describe('Deleting a RACE TRACK', () => {
    test('that does not exist', async () => {
        await expect(RaceTrack.delete(-42))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('that exists', async () => {
        const node = await seedRaceTrack()
        await expect(RaceTrack.delete(node.id))
            .resolves
            .not.toThrow(NodeNotFoundError)
    })
})
