import {expect, test} from 'vitest'
import {deleteAllNodesOfType} from "../../../../_toolbox/dbSeeding/deleteAllNodesOfType"
import {NodeTypeEnum} from "../../../../../src/controllers/nodes/types/NodeTypeEnum"
import {CompanyNode} from "../../../../../src/db/nodes/companies/types/CompanyNode"
import {seedCompanies} from "../../../../_toolbox/dbSeeding/companies/nodes/seedCompanies"
import {getAllNodesOfType} from "../../../../../src/db/nodes/companies/getAllNodesOfType"

test('When there are no COMPANIES then an empty array should be returned', async () => {
    await deleteAllNodesOfType(NodeTypeEnum.COMPANY)

    const expectedCompanies: Array<CompanyNode> = []
    const actualCompanies = await getAllNodesOfType()

    expect(actualCompanies)
        .toEqual(expectedCompanies)
})

test('When COMPANIES exist then all of them should be returned', async () => {
    await deleteAllNodesOfType(NodeTypeEnum.COMPANY)
    const amount = Math.ceil(Math.random() * 50)
    await seedCompanies(amount)

    const actualCompanies = await getAllNodesOfType()

    expect(actualCompanies.length)
        .toEqual(amount)
})
