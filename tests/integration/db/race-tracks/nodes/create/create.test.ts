import {expect, test} from 'vitest'
import {FakeRaceTrack} from "../../../../../_toolbox/fixtures/nodes/FakeRaceTrack"
import {createNode} from "../../../../../../src/db/nodes/race-tracks/createNode"

test('Creating node with valid data', async () => {
    const inputData = FakeRaceTrack.dbInput()
    const createdNode = await createNode(inputData)

    expect(createdNode)
        .toEqual(expect.objectContaining(inputData))
})
