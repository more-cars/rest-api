import {expect, test} from 'vitest'
import {getNodeById} from "../../../../../src/db/nodes/companies/getNodeById"
import {seedNode} from "../../../../_toolbox/dbSeeding/seedNode"
import {ControllerNodeType} from "../../../../../src/controllers/nodes/types/ControllerNodeType"
import {CompanySchema} from "../../../../_toolbox/schemas/CompanySchema"
import {validateJson} from "../../../../_toolbox/validateJson"

test('Querying a COMPANY that does not exist should return "false"', async () => {
    const expectedCompanyNode = false
    const actualCompanyNode = await getNodeById(-42)

    expect(actualCompanyNode)
        .toBe(expectedCompanyNode)
})

test('Querying an existing COMPANY should return a db node with correct schema', async () => {
    const createdNode = await seedNode(ControllerNodeType.COMPANY)
    const companyNode = await getNodeById(createdNode.id)

    expect(validateJson(companyNode, CompanySchema))
        .toBeTruthy()
})
