import {describe, expect, test} from 'vitest'
import {RaceTrack} from "../../../../../../../src/models/node-types/race-tracks/RaceTrack"
import {FakeRaceTrack} from "../../../../../../_toolbox/fixtures/nodes/FakeRaceTrack"
import type {RaceTrackInput} from "../../../../../../../src/models/node-types/race-tracks/types/RaceTrackInput"
import {NodeNotFoundError} from "../../../../../../../src/models/types/NodeNotFoundError"
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../src/db/types/DbNodeType"

describe('Updating a RACE TRACK', () => {
    test('Node does not exist', async () => {
        await expect(RaceTrack.update(-42, FakeRaceTrack.dbInput() as RaceTrackInput))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('Node exists', async () => {
        const createdNode = await seedNode(DbNodeType.RaceTrack)
        const inputData = FakeRaceTrack.dbInput()
        const updatedNode = await RaceTrack.update(createdNode.properties.id, inputData as RaceTrackInput)

        expect(updatedNode.attributes)
            .toEqual(expect.objectContaining(inputData))
    })

    test('Trying to override read-only properties', async () => {
        const createdNode = await seedNode(DbNodeType.RaceTrack)
        const validData = FakeRaceTrack.dbInput()
        const readOnlyData = {
            id: 9999,
            created_at: "NOT_ALLOWED_TO_OVERWRITE",
            updated_at: "NOT_ALLOWED_TO_OVERWRITE",
        }
        const inputData = Object.assign({}, validData, readOnlyData)

        const updatedNode = await RaceTrack.update(createdNode.properties.id, inputData as RaceTrackInput)

        expect(updatedNode.attributes)
            .not.toEqual(expect.objectContaining(readOnlyData))
    })
})
