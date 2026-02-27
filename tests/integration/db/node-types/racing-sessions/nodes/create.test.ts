import {describe, expect, test} from 'vitest'
import {FakeRacingSession} from "../../../../../_toolbox/fixtures/nodes/FakeRacingSession"
import {createNode} from "../../../../../../src/db/node-types/racing-sessions/createNode"

describe('Creating node', () => {
    test('with valid data', async () => {
        const inputData = FakeRacingSession.dbInput
        const createdNode = await createNode(inputData)

        expect(createdNode.properties)
            .toEqual(expect.objectContaining(inputData))
    })

    test('with valid minimum data', async () => {
        const inputData = FakeRacingSession.dbInputMinimal
        const createdNode = await createNode(inputData)

        expect(createdNode.properties)
            .toEqual(expect.objectContaining(inputData))
    })
})