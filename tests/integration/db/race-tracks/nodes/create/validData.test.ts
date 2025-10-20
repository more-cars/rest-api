import {expect, test} from 'vitest'
import {createNode} from "../../../../../../src/db/nodes/race-tracks/createNode"
import FakeRaceTrack from "../../../../../_toolbox/fixtures/nodes/FakeRaceTrack"

test('Creating node with valid data', async () => {
    const createdNode = await createNode(FakeRaceTrack)

    expect(createdNode)
        .toEqual(expect.objectContaining(FakeRaceTrack))
})
