import {expect, test} from 'vitest'
import {getNodeById} from "../../../../../src/db/nodes/companies/getNodeById"
import {seedCompany} from "../../../../_toolbox/dbSeeding/companies/nodes/seedCompany"
import {CompanyNode} from "../../../../../src/db/nodes/companies/types/CompanyNode"
import {CompanySchema} from "../../../../_toolbox/schemas/CompanySchema"
import {validateJson} from "../../../../_toolbox/validateJson"

test('Querying a COMPANY that does not exist should return "false"', async () => {
    const expectedCompanyNode = false
    const actualCompanyNode = await getNodeById(-42)

    expect(actualCompanyNode)
        .toBe(expectedCompanyNode)
})

test('Querying an existing COMPANY should return a db node with correct schema', async () => {
    const createdNode: CompanyNode = await seedCompany()
    const companyNode = await getNodeById(createdNode.id)

    expect(validateJson(companyNode, CompanySchema))
        .toBe(true)
})
