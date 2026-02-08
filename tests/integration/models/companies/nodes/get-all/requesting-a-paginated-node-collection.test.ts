import {describe, expect, test} from 'vitest'
import {deleteAllNodesOfType} from "../../../../../_toolbox/dbSeeding/deleteAllNodesOfType"
import {NodeTypeEnum} from "../../../../../../src/controllers/nodes/types/NodeTypeEnum"
import type {CompanyNode} from "../../../../../../src/models/companies/types/CompanyNode"
import {Company} from "../../../../../../src/models/companies/Company"
import {seedCompanies} from "../../../../../_toolbox/dbSeeding/companies/nodes/seedCompanies"

describe('A paginated "get all COMPANY nodes" request returns the correct number of nodes', () => {
    test('when there exist NO company nodes', async () => {
        await deleteAllNodesOfType(NodeTypeEnum.COMPANY)

        const expectedNodes: Array<CompanyNode> = []
        const actualNodes = await Company.findAll({page: 1})

        expect(actualNodes)
            .toEqual(expectedNodes)
    })

    test('when there exist company nodes', async () => {
        await deleteAllNodesOfType(NodeTypeEnum.COMPANY)
        const amount = Math.ceil(Math.random() * 20)
        await seedCompanies(amount)

        const actualNodes = await Company.findAll({page: 1})

        expect(actualNodes.length)
            .toEqual(amount)
    })
})
