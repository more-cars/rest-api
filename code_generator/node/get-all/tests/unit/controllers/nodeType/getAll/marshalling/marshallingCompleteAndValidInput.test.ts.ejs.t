---
to: tests/unit/controllers/<%= h.changeCase.kebab(h.inflection.pluralize(nodeType)) %>/getAll/marshallingCompleteAndValidInput.test.ts
---
import {expect, test} from 'vitest'
import type {CompanyNode} from "../../../../../src/models/companies/types/CompanyNode"
import FakeCompany from "../../../../_toolbox/fixtures/nodes/FakeCompany"
import {marshalAll} from "../../../../../src/controllers/companies/marshalAll"

test('marshalling a complete and valid request', async () => {
    const fakeCompany1: CompanyNode = Object.assign({}, FakeCompany, {id: 1, created_at: "dummy", updated_at: "dummy"})
    const fakeCompany2: CompanyNode = Object.assign({}, FakeCompany, {id: 2, created_at: "dummy", updated_at: "dummy"})
    const fakeCompany3: CompanyNode = Object.assign({}, FakeCompany, {id: 3, created_at: "dummy", updated_at: "dummy"})

    const nodes: Array<<%= h.changeCase.pascal(nodeType) %>Node> = [
        fakeCompany1,
        fakeCompany2,
        fakeCompany3,
    ]

    const mappedNodes = marshalAll(nodes)

    expect(mappedNodes[0])
        .toEqual(fakeCompany1)

    expect(mappedNodes[1])
        .toEqual(fakeCompany2)

    expect(mappedNodes[2])
        .toEqual(fakeCompany3)
})
