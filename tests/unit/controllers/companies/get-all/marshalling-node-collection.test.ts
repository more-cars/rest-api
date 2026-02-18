import {expect, test} from 'vitest'
import {FakeCompany} from "../../../../_toolbox/fixtures/nodes/FakeCompany"
import {marshalNodes} from "../../../../../src/controllers/node-types/companies/marshalling/marshalNodes"

test("marshalling a collection of COMPANY nodes", async () => {
    const fakeNode1 = FakeCompany.modelOutput()
    const fakeNode2 = FakeCompany.modelOutput()
    const fakeNode3 = FakeCompany.modelOutput()

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
