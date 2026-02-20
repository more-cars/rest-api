import {describe, expect, test} from 'vitest'
import {deleteAllNodesOfType} from "../../../../../_toolbox/dbSeeding/deleteAllNodesOfType"
import {ControllerNodeType} from "../../../../../../src/controllers/nodes/types/ControllerNodeType"
import type {CompanyNode} from "../../../../../../src/models/node-types/companies/types/CompanyNode"
import {Company} from "../../../../../../src/models/node-types/companies/Company"
import {seedNodes} from "../../../../../_toolbox/dbSeeding/seedNodes"

describe('A paginated "get all COMPANY nodes" request returns the correct number of nodes', () => {
    test('when there exist no COMPANY nodes', async () => {
        await deleteAllNodesOfType(ControllerNodeType.COMPANY)

        const expectedNodes: CompanyNode[] = []
        const actualNodes = await Company.findAll({page: 1})

        expect(actualNodes)
            .toEqual(expectedNodes)
    })

    test('when there exist COMPANY nodes', async () => {
        await deleteAllNodesOfType(ControllerNodeType.COMPANY)
        const amount = Math.ceil(Math.random() * 20)
        await seedNodes(ControllerNodeType.COMPANY, amount)

        const actualNodes = await Company.findAll({page: 1})

        expect(actualNodes.length)
            .toEqual(amount)
    })
})
