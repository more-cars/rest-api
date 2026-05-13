import {describe, expect, test} from 'vitest'
import {Company} from "../../../../../src/models/node-types/companies/Company"
import {FakeCompany} from "../../../../_toolbox/fixtures/nodes/FakeCompany"
import type {CompanyInput} from "../../../../../src/models/node-types/companies/types/CompanyInput"

describe('trying to update a node with unknown properties', () => {
    test('unknown properties are ignored', async () => {
        const createdNode = await Company.create(FakeCompany.dbInput())
        const data = Object.assign({}, createdNode.attributes, {
            "my_property": "NOT_ALLOWED_TO_ADD"
        })

        const updatedNode = await Company.update(createdNode.attributes.id, data as CompanyInput)

        expect(updatedNode.attributes)
            .not.toContain("my_property")
    })
})
