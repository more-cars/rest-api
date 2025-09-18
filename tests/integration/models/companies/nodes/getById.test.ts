import {expect, test} from 'vitest'
import {Company} from "../../../../../src/models/companies/Company"
import {seedCompany} from "../../../../_toolbox/dbSeeding/companies/nodes/seedCompany"

test('Fetching a COMPANY that does not exist should return "false"', async () => {
    const expectedCompany = false
    const actualCompany = await Company.findById(-42)

    expect(actualCompany)
        .toEqual(expectedCompany)
})

test('When the COMPANY exists it should be returned', async () => {
    const expectedCompany = await seedCompany()
    const actualCompany = await Company.findById(expectedCompany.id)

    expect(actualCompany)
        .toEqual(expectedCompany)
})
