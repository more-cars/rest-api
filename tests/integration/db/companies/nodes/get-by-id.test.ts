import {expect, test} from 'vitest'
import {getNodeById} from "../../../../../src/db/nodes/companies/getNodeById"
import {seedNode} from "../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../src/db/types/DbNodeType"
import {CompanySchema} from "../../../../_toolbox/schemas/db/CompanySchema"
import {validateJson} from "../../../../_toolbox/validateJson"

test('Querying a COMPANY that does not exist should return "false"', async () => {
    const expectedCompanyNode = false
    const actualCompanyNode = await getNodeById(-42)

    expect(actualCompanyNode)
        .toBe(expectedCompanyNode)
})

test('Querying an existing COMPANY should return a db node with correct schema', async () => {
    const createdNode = await seedNode(DbNodeType.Company)
    const companyNode = await getNodeById(createdNode.properties.id)

    expect(validateJson(companyNode, CompanySchema))
        .toBeTruthy()
})
