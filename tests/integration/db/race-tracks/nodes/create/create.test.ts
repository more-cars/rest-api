import {describe, expect, test} from 'vitest'
import {FakeRaceTrack} from "../../../../../_toolbox/fixtures/nodes/FakeRaceTrack"
import {createNode} from "../../../../../../src/db/nodes/race-tracks/createNode"

describe('Creating node', () => {
    test('with valid data', async () => {
        const inputData = FakeRaceTrack.dbInput()
        const createdNode = await createNode(inputData)

        expect(createdNode)
            .toEqual(expect.objectContaining(inputData))
    })

    test('with valid minimum data', async () => {
        const inputData = FakeRaceTrack.dbInputMinimal()
        const createdNode = await createNode(inputData)

        expect(createdNode)
            .toEqual(expect.objectContaining(inputData))
    })
})
