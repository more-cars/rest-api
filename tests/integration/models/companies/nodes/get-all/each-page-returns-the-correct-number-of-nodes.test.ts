import {describe, expect, test} from 'vitest'
import type {CompanyNode} from "../../../../../../src/models/node-types/companies/types/CompanyNode"
import {Company} from "../../../../../../src/models/node-types/companies/Company"
import {seedNodes} from "../../../../../_toolbox/dbSeeding/seedNodes"
import {DbNodeType} from "../../../../../../src/db/types/DbNodeType"
import {deleteAllNodesOfType} from "../../../../../_toolbox/dbSeeding/deleteAllNodesOfType"
import {ControllerNodeType} from "../../../../../../src/controllers/nodes/types/ControllerNodeType"

describe('Each page of a "get all COMPANY nodes" request returns the correct number of nodes', () => {
    test.each([
        [1],
        [2],
        [99],
    ])('when there exist no COMPANY nodes (page=$0)', async (page) => {
        await deleteAllNodesOfType(DbNodeType.Company)

        const expectedNodes: CompanyNode[] = []
        const actualNodes = await Company.findAll({page})

        expect(actualNodes)
            .toEqual(expectedNodes)
    })

    test.each([
        [20, 1, 20],
        [5, 2, 0],
    ])('when there exist $0 COMPANY nodes (page=$1)', async (totalNodeAmount, page, expectedNodeAmountOnPage) => {
        await deleteAllNodesOfType(DbNodeType.Company)
        await seedNodes(DbNodeType.Company, totalNodeAmount)

        const actualNodes = await Company.findAll({page})

        expect(actualNodes.length)
            .toEqual(expectedNodeAmountOnPage)
    })
})
