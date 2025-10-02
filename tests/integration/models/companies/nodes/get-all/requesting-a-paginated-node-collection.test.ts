import {describe, expect, test} from 'vitest'
import {deleteAllCompanies} from "../../../../../_toolbox/dbSeeding/companies/nodes/deleteAllCompanies"
import type {CompanyNode} from "../../../../../../src/models/companies/types/CompanyNode"
import {Company} from "../../../../../../src/models/companies/Company"
import {seedCompanies} from "../../../../../_toolbox/dbSeeding/companies/nodes/seedCompanies"

describe('A paginated "get all COMPANY nodes" request returns the correct number of nodes', () => {
    test('when there exist NO company nodes', async () => {
        await deleteAllCompanies()

        const expectedNodes: Array<CompanyNode> = []
        const actualNodes = await Company.findAll({page: 1})

        expect(actualNodes)
            .toEqual(expectedNodes)
    })

    test('when there exist company nodes', async () => {
        await deleteAllCompanies()
        const amount = Math.ceil(Math.random() * 20)
        await seedCompanies(amount)

        const actualNodes = await Company.findAll({page: 1})

        expect(actualNodes.length)
            .toEqual(amount)
    })
})
