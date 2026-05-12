import {describe, expect, test} from 'vitest'
import {FakeRacingEvent} from "../../../../../_toolbox/fixtures/nodes/FakeRacingEvent"
import {createDbNode} from "../../../../../../src/db/nodes/createDbNode"
import {DbNodeType} from "../../../../../../src/db/types/DbNodeType"

describe('Creating node', () => {
    test('with valid data', async () => {
        const inputData = FakeRacingEvent.dbInput
        const createdNode = await createDbNode(DbNodeType.RacingEvent, inputData)

        expect(createdNode.properties)
            .toEqual(expect.objectContaining(inputData))
    })

    test('with valid minimum data', async () => {
        const inputData = FakeRacingEvent.dbInputMinimal
        const createdNode = await createDbNode(DbNodeType.RacingEvent, inputData)

        expect(createdNode.properties)
            .toEqual(expect.objectContaining(inputData))
    })
})
