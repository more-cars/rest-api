import {describe, expect, test} from 'vitest'
import {Company} from "../../../../../src/models/node-types/companies/Company"
import {FakeCompany} from "../../../../_toolbox/fixtures/nodes/FakeCompany"
import type {CompanyInput} from "../../../../../src/models/node-types/companies/types/CompanyInput"

describe('updating a node', () => {
    test('updated_at timestamp is updated, but not created_at', async () => {
        const createdNode = await Company.create(FakeCompany.dbInput)
        const updatedNode = await Company.update(createdNode.attributes.id, createdNode.attributes as CompanyInput)

        expect(createdNode.attributes.created_at)
            .toEqual(updatedNode.attributes.created_at)

        expect(updatedNode.attributes.created_at)
            .not.toEqual(updatedNode.attributes.updated_at)
    })
})
