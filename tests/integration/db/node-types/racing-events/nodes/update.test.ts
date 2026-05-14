import {describe, expect, test} from 'vitest'
import {seedNode} from "../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../src/db/types/DbNodeType"
import {FakeRacingEvent} from "../../../../../_toolbox/fixtures/nodes/FakeRacingEvent"
import {updateDbNode} from "../../../../../../src/db/nodes/updateDbNode"
import type {InputRacingEventCreate} from "../../../../../../src/db/node-types/racing-events/types/InputRacingEventCreate"
import type {RacingEventNode} from "../../../../../../src/db/node-types/racing-events/types/RacingEventNode"

describe('Updating RACING EVENT', () => {
    test('with valid data', async () => {
        const createdNode = await seedNode(DbNodeType.RacingEvent)
        const inputData = FakeRacingEvent.dbInput()
        const updatedNode = await updateDbNode(DbNodeType.RacingEvent, createdNode.properties.id, inputData)

        expect(updatedNode.properties)
            .not.toEqual(expect.objectContaining(createdNode.properties))

        expect(updatedNode.properties)
            .toEqual(expect.objectContaining(inputData))
    })

    test('with the same data', async () => {
        const createdNode = await seedNode(DbNodeType.RacingEvent)
        const inputData = createdNode.properties as unknown as InputRacingEventCreate
        const updatedNode = await updateDbNode(DbNodeType.RacingEvent, createdNode.properties.id, inputData)

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
        const createdNode = await seedNode(DbNodeType.RacingEvent)
        const inputData = createdNode.properties as unknown as InputRacingEventCreate
        // @ts-expect-error TS2339 TS2339 TS2339
        inputData.name = null
        const updatedNode = await updateDbNode(DbNodeType.RacingEvent, createdNode.properties.id, inputData) as RacingEventNode

        expect(updatedNode.properties.name)
            .toBeNull()
    })
})
