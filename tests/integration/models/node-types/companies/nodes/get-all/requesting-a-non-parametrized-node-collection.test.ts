import {describe, expect, test} from 'vitest'
import {deleteAllNodesOfType} from "../../../../../../_toolbox/dbSeeding/deleteAllNodesOfType"
import type {CompanyNode} from "../../../../../../../src/models/node-types/companies/types/CompanyNode"
import {Company} from "../../../../../../../src/models/node-types/companies/Company"
import {seedNodes} from "../../../../../../_toolbox/dbSeeding/seedNodes"
import {DbNodeType} from "../../../../../../../src/db/types/DbNodeType"

describe('A non-parametrized "get all COMPANY nodes" request returns the correct number of nodes', () => {
    test('when there exist no COMPANY nodes', async () => {
        await deleteAllNodesOfType(DbNodeType.Company)

        const expectedNodes: CompanyNode[] = []
        const actualNodes = await Company.findAll()

        expect(actualNodes)
            .toEqual(expectedNodes)
    })

    test('when there exist COMPANY nodes', async () => {
        await deleteAllNodesOfType(DbNodeType.Company)
        const amount = Math.ceil(Math.random() * 20)
        await seedNodes(DbNodeType.Company, amount)

        const actualNodes = await Company.findAll()

        expect(actualNodes.length)
            .toEqual(amount)
    })
})
