import {describe, expect, test} from 'vitest'
import {FakeRacingEvent} from "../../../../../_toolbox/fixtures/nodes/FakeRacingEvent"
import {createNode} from "../../../../../../src/db/nodes/racing-events/createNode"

describe('Creating node', () => {
    test('with valid data', async () => {
        const inputData = FakeRacingEvent.dbInput()
        const createdNode = await createNode(inputData)

        expect(createdNode.properties)
            .toEqual(expect.objectContaining(inputData))
    })

    test('with valid minimum data', async () => {
        const inputData = FakeRacingEvent.dbInputMinimal()
        const createdNode = await createNode(inputData)

        expect(createdNode.properties)
            .toEqual(expect.objectContaining(inputData))
    })
})
