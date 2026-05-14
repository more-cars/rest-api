import {describe, expect, test} from 'vitest'
import {seedNode} from "../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../src/db/types/DbNodeType"
import {FakeRacingSession} from "../../../../../_toolbox/fixtures/nodes/FakeRacingSession"
import {updateDbNode} from "../../../../../../src/db/nodes/updateDbNode"
import type {InputRacingSessionCreate} from "../../../../../../src/db/node-types/racing-sessions/types/InputRacingSessionCreate"
import type {RacingSessionNode} from "../../../../../../src/db/node-types/racing-sessions/types/RacingSessionNode"

describe('Updating RACING SESSION', () => {
    test('with valid data', async () => {
        const createdNode = await seedNode(DbNodeType.RacingSession)
        const inputData = FakeRacingSession.dbInput()
        const updatedNode = await updateDbNode(DbNodeType.RacingSession, createdNode.properties.id, inputData)

        expect(updatedNode.properties)
            .not.toEqual(expect.objectContaining(createdNode.properties))

        expect(updatedNode.properties)
            .toEqual(expect.objectContaining(inputData))
    })

    test('with the same data', async () => {
        const createdNode = await seedNode(DbNodeType.RacingSession)
        const inputData = createdNode.properties as unknown as InputRacingSessionCreate
        const updatedNode = await updateDbNode(DbNodeType.RacingSession, createdNode.properties.id, inputData)

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
        const createdNode = await seedNode(DbNodeType.RacingSession)
        const inputData = createdNode.properties as unknown as InputRacingSessionCreate
        // @ts-expect-error TS2339 TS2339 TS2339
        inputData.name = null
        const updatedNode = await updateDbNode(DbNodeType.RacingSession, createdNode.properties.id, inputData) as RacingSessionNode

        expect(updatedNode.properties.name)
            .toBeNull()
    })
})
