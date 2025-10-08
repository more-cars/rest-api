import {expect, test} from 'vitest'
import type {CompanyNode} from "../../../../../src/models/companies/types/CompanyNode"
import FakeCompany from "../../../../_toolbox/fixtures/nodes/FakeCompany"
import {marshalNodeCollection} from "../../../../../src/controllers/companies/marshalling/marshalNodeCollection"

test('marshalling a complete and valid request', async () => {
    const fakeCompany1: CompanyNode = Object.assign({}, FakeCompany, {id: 1, created_at: "dummy", updated_at: "dummy"})
    const fakeCompany2: CompanyNode = Object.assign({}, FakeCompany, {id: 2, created_at: "dummy", updated_at: "dummy"})
    const fakeCompany3: CompanyNode = Object.assign({}, FakeCompany, {id: 3, created_at: "dummy", updated_at: "dummy"})

    const nodes: Array<CompanyNode> = [
        fakeCompany1,
        fakeCompany2,
        fakeCompany3,
    ]

    const mappedNodes = marshalNodeCollection(nodes)

    expect(mappedNodes[0])
        .toEqual(fakeCompany1)

    expect(mappedNodes[1])
        .toEqual(fakeCompany2)

    expect(mappedNodes[2])
        .toEqual(fakeCompany3)
})
