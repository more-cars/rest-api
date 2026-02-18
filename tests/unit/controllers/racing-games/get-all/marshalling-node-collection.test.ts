import {expect, test} from 'vitest'
import {FakeRacingGame} from "../../../../_toolbox/fixtures/nodes/FakeRacingGame"
import {marshalNodes} from "../../../../../src/controllers/node-types/racing-games/marshalling/marshalNodes"

test("marshalling a collection of RACING GAME nodes", async () => {
    const fakeNode1 = FakeRacingGame.modelOutput()
    const fakeNode2 = FakeRacingGame.modelOutput()
    const fakeNode3 = FakeRacingGame.modelOutput()

    const nodes = [
        fakeNode1,
        fakeNode2,
        fakeNode3,
    ]

    const marshalledData = marshalNodes(nodes)

    expect(marshalledData.data[0])
        .toEqual({data: fakeNode1})

    expect(marshalledData.data[1])
        .toEqual({data: fakeNode2})

    expect(marshalledData.data[2])
        .toEqual({data: fakeNode3})
})
