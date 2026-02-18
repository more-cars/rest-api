import {expect, test} from 'vitest'
import {FakeGamingPlatform} from "../../../../_toolbox/fixtures/nodes/FakeGamingPlatform"
import {marshalNodes} from "../../../../../src/controllers/node-types/gaming-platforms/marshalling/marshalNodes"

test("marshalling a collection of GAMING PLATFORM nodes", async () => {
    const fakeNode1 = FakeGamingPlatform.modelOutput()
    const fakeNode2 = FakeGamingPlatform.modelOutput()
    const fakeNode3 = FakeGamingPlatform.modelOutput()

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
