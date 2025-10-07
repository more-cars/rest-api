import {describe, expect, test} from 'vitest'
import {deleteAllCompanies} from "../../../../../_toolbox/dbSeeding/companies/nodes/deleteAllCompanies"
import type {CompanyNode} from "../../../../../../src/models/companies/types/CompanyNode"
import {Company} from "../../../../../../src/models/companies/Company"
import {FilterOperator} from "../../../../../../src/models/types/FilterOperator"
import {seedCompany} from "../../../../../_toolbox/dbSeeding/companies/nodes/seedCompany"

describe('A filtered "get all COMPANY nodes" request returns only the matching nodes', () => {
    test('when there exist NO company nodes', async () => {
        await deleteAllCompanies()

        const expectedNodes: Array<CompanyNode> = []
        const actualNodes = await Company.findAll({
            filterByProperty: 'name',
            filterValue: 'test',
            filterOperator: FilterOperator.equal
        })

        expect(actualNodes)
            .toEqual(expectedNodes)
    })

    test('when there exist company nodes', async () => {
        await deleteAllCompanies()
        const nodeA = await seedCompany({name: 'A Node'})
        await seedCompany({name: 'B Node'})
        await seedCompany({name: 'C Node'})

        const filteredNodes = await Company.findAll({
            filterByProperty: 'name',
            filterValue: 'A Node',
            filterOperator: FilterOperator.equal
        })
        expect(filteredNodes.length).toEqual(1)
        expect(filteredNodes[0].name === nodeA.name)
    })
})
