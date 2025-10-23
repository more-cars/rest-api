import {expect, test} from 'vitest'
import {FakeCompany} from "../../../../_toolbox/fixtures/nodes/FakeCompany"
import {Company} from "../../../../../src/models/companies/Company"

test('Expecting node to be created when provided with valid data', async () => {
    const inputData = FakeCompany.dbInput()
    const createdNode = await Company.create(inputData)

    expect(createdNode)
        .toEqual(expect.objectContaining(inputData))
})

test('Trying to override read-only properties', async () => {
    const validData = FakeCompany.dbInput()
    const readOnlyData = {
        id: 9999,
        created_at: "NOT_ALLOWED_TO_OVERWRITE",
        updated_at: "NOT_ALLOWED_TO_OVERWRITE",
    }
    const data = Object.assign(validData, readOnlyData)
    const createdNode = await Company.create(data)

    expect(createdNode)
        .not.toEqual(expect.objectContaining(readOnlyData))
})
