import {expect, test} from 'vitest'
import {deleteAllNodesOfType} from "../../../../_toolbox/dbSeeding/deleteAllNodesOfType"
import {DbNodeType} from "../../../../../src/db/types/DbNodeType"
import {CompanyNode} from "../../../../../src/db/node-types/companies/types/CompanyNode"
import {seedNodes} from "../../../../_toolbox/dbSeeding/seedNodes"
import {getAllNodesOfType} from "../../../../../src/db/node-types/companies/getAllNodesOfType"

test('When there are no COMPANIES then an empty array should be returned', async () => {
    await deleteAllNodesOfType(DbNodeType.Company)

    const expectedCompanies: CompanyNode[] = []
    const actualCompanies = await getAllNodesOfType()

    expect(actualCompanies)
        .toEqual(expectedCompanies)
})

test('When COMPANIES exist then all of them should be returned', async () => {
    await deleteAllNodesOfType(DbNodeType.Company)
    const amount = Math.ceil(Math.random() * 50)
    await seedNodes(DbNodeType.Company, amount)

    const actualCompanies = await getAllNodesOfType()

    expect(actualCompanies.length)
        .toEqual(amount)
})
