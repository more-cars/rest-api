import {describe, expect, test} from 'vitest'
import {RaceTrack} from "../../../../../src/models/node-types/race-tracks/RaceTrack"
import {seedNode} from "../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../src/db/types/DbNodeType"
import {NodeNotFoundError} from "../../../../../src/models/types/NodeNotFoundError"

describe('Fetching a RACE TRACK', () => {
    test('which does not exist', async () => {
        await expect(RaceTrack.findById(-42))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('which exists', async () => {
        const expectedRaceTrack = await seedNode(DbNodeType.RaceTrack)
        const actualRaceTrack = await RaceTrack.findById(expectedRaceTrack.properties.id)

        expect(actualRaceTrack.attributes)
            .toEqual(expectedRaceTrack.properties)
    })
})
