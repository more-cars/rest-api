import {describe, expect, test} from 'vitest'
import {Company} from "../../../../../../src/models/node-types/companies/Company"
import {FakeCompany} from "../../../../../_toolbox/fixtures/nodes/FakeCompany"
import type {CompanyInput} from "../../../../../../src/models/node-types/companies/types/CompanyInput"
import {NodeNotFoundError} from "../../../../../../src/models/types/NodeNotFoundError"
import {seedNode} from "../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../src/db/types/DbNodeType"

describe('Updating a COMPANY', () => {
    test('Node does not exist', async () => {
        await expect(Company.update(-42, FakeCompany.dbInput as CompanyInput))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('Node exists', async () => {
        const createdNode = await seedNode(DbNodeType.Company)
        // @ts-ignore TODO workaround until the node faker can return fresh copies, instead of cached ones
        const {FakeCompany} = await import("../../../../../_toolbox/fixtures/nodes/FakeCompany?update=${Date.now()}")
        const inputData = FakeCompany.dbInput
        const updatedNode = await Company.update(createdNode.properties.id, inputData)

        expect(updatedNode.attributes)
            .toEqual(expect.objectContaining(inputData))
    })

    test('Trying to override read-only properties', async () => {
        const createdNode = await seedNode(DbNodeType.Company)
        const validData = FakeCompany.dbInput
        const readOnlyData = {
            id: 9999,
            created_at: "NOT_ALLOWED_TO_OVERWRITE",
            updated_at: "NOT_ALLOWED_TO_OVERWRITE",
        }
        const inputData = Object.assign({}, validData, readOnlyData)

        const updatedNode = await Company.update(createdNode.properties.id, inputData as CompanyInput)

        expect(updatedNode.attributes)
            .not.toEqual(expect.objectContaining(readOnlyData))
    })
})
