import {describe, expect, test} from 'vitest'
import {seedNode} from "../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../src/db/types/DbNodeType"
import {FakeRaceTrack} from "../../../../../_toolbox/fixtures/nodes/FakeRaceTrack"
import {updateDbNode} from "../../../../../../src/db/nodes/updateDbNode"
import type {InputRaceTrackCreate} from "../../../../../../src/db/node-types/race-tracks/types/InputRaceTrackCreate"
import type {RaceTrackNode} from "../../../../../../src/db/node-types/race-tracks/types/RaceTrackNode"

describe('Updating RACE TRACK', () => {
    test('with valid data', async () => {
        const createdNode = await seedNode(DbNodeType.RaceTrack)
        const inputData = FakeRaceTrack.dbInput()
        const updatedNode = await updateDbNode(DbNodeType.RaceTrack, createdNode.properties.id, inputData)

        expect(updatedNode.properties)
            .not.toEqual(expect.objectContaining(createdNode.properties))

        expect(updatedNode.properties)
            .toEqual(expect.objectContaining(inputData))
    })

    test('with the same data', async () => {
        const createdNode = await seedNode(DbNodeType.RaceTrack)
        const inputData = createdNode.properties as unknown as InputRaceTrackCreate
        const updatedNode = await updateDbNode(DbNodeType.RaceTrack, createdNode.properties.id, inputData)

        expect(updatedNode.properties)
            .not.toEqual(createdNode.properties.updated_at)

        createdNode.properties.updated_at = ''
        updatedNode.properties.updated_at = ''

        expect(updatedNode.properties)
            .toEqual(expect.objectContaining(createdNode.properties))

        expect(updatedNode.properties)
            .toEqual(expect.objectContaining(inputData))
    })

    test('removing a field', async () => {
        const createdNode = await seedNode(DbNodeType.RaceTrack)
        const inputData = createdNode.properties as unknown as InputRaceTrackCreate
        // @ts-expect-error TS2339 TS2339 TS2339
        inputData.name = null
        const updatedNode = await updateDbNode(DbNodeType.RaceTrack, createdNode.properties.id, inputData) as RaceTrackNode

        expect(updatedNode.properties.name)
            .toBeNull()
    })
})
