import {describe, expect, test} from 'vitest'
import type {CompanyNode} from "../../../../../../src/models/companies/types/CompanyNode"
import {Company} from "../../../../../../src/models/companies/Company"
import {seedCompanies} from "../../../../../_toolbox/dbSeeding/companies/nodes/seedCompanies"
import {deleteAllNodesOfType} from "../../../../../_toolbox/dbSeeding/deleteAllNodesOfType"
import {NodeTypeEnum} from "../../../../../../src/controllers/nodes/types/NodeTypeEnum"

describe('Each page of a "get all COMPANY nodes" request returns the correct number of nodes', () => {
    test.each([
        [1],
        [2],
        [99],
    ])('when there exist NO company nodes (page=$0)', async (page) => {
        await deleteAllNodesOfType(NodeTypeEnum.COMPANY)

        const expectedNodes: Array<CompanyNode> = []
        const actualNodes = await Company.findAll({page})

        expect(actualNodes)
            .toEqual(expectedNodes)
    })

    test.each([
        [20, 1, 20],
        [5, 2, 0],
    ])('when there exist $0 company nodes (page=$1)', async (totalNodeAmount, page, expectedNodeAmountOnPage) => {
        await deleteAllNodesOfType(NodeTypeEnum.COMPANY)
        await seedCompanies(totalNodeAmount)

        const actualNodes = await Company.findAll({page})

        expect(actualNodes.length)
            .toEqual(expectedNodeAmountOnPage)
    })
})
