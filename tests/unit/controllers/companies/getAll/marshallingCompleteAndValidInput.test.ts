import {expect, test} from 'vitest'
import type {CompanyNode} from "../../../../../src/models/companies/types/CompanyNode"
import FakeCompany from "../../../../_toolbox/fixtures/nodes/FakeCompany"
import {marshalNodes} from "../../../../../src/controllers/companies/marshalling/marshalNodes"

test('marshalling a complete and valid request', async () => {
    const fakeNode1: CompanyNode = Object.assign({}, FakeCompany, {id: 1, created_at: "dummy", updated_at: "dummy"})
    const fakeNode2: CompanyNode = Object.assign({}, FakeCompany, {id: 2, created_at: "dummy", updated_at: "dummy"})
    const fakeNode3: CompanyNode = Object.assign({}, FakeCompany, {id: 3, created_at: "dummy", updated_at: "dummy"})

    const nodes: Array<CompanyNode> = [
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
