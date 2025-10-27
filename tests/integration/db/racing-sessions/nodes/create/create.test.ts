import {expect, test} from 'vitest'
import {FakeRacingSession} from "../../../../../_toolbox/fixtures/nodes/FakeRacingSession"
import {createNode} from "../../../../../../src/db/nodes/racing-sessions/createNode"

test('Creating node with valid data', async () => {
    const inputData = FakeRacingSession.dbInput()
    const createdNode = await createNode(inputData)

    expect(createdNode)
        .toEqual(expect.objectContaining(inputData))
})
