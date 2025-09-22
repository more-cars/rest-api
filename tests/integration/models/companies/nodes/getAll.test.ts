import {expect, test} from 'vitest'
import {deleteAllCompanies} from "../../../../_toolbox/dbSeeding/companies/nodes/deleteAllCompanies"
import {CompanyNode} from "../../../../../src/models/companies/types/CompanyNode"
import {Company} from "../../../../../src/models/companies/Company"
import {seedCompanies} from "../../../../_toolbox/dbSeeding/companies/nodes/seedCompanies"

test('When there are no COMPANIES then an empty array should be returned', async () => {
    await deleteAllCompanies()

    const expectedCompanies: Array<CompanyNode> = []
    const actualCompanies = await Company.findAll()

    expect(actualCompanies)
        .toEqual(expectedCompanies)
})

test('When COMPANIES exist then all of them should be returned', async () => {
    await deleteAllCompanies()
    const amount = Math.ceil(Math.random() * 50)
    await seedCompanies(amount)

    const actualCompanies = await Company.findAll()

    expect(actualCompanies.length)
        .toEqual(amount)
})
