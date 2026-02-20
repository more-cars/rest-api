import {expect, test} from 'vitest'
import {Company} from "../../../../../src/models/node-types/companies/Company"
import {seedNode} from "../../../../_toolbox/dbSeeding/seedNode"
import {ControllerNodeType} from "../../../../../src/controllers/nodes/types/ControllerNodeType"

test('Fetching a COMPANY that does not exist should return "false"', async () => {
    const expectedCompany = false
    const actualCompany = await Company.findById(-42)

    expect(actualCompany)
        .toEqual(expectedCompany)
})

test('When the COMPANY exists it should be returned', async () => {
    const expectedCompany = await seedNode(ControllerNodeType.COMPANY)
    const actualCompany = await Company.findById(expectedCompany.id)

    expect(actualCompany)
        .toEqual(expectedCompany)
})
