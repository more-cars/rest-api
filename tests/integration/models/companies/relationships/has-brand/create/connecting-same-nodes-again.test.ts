import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {ControllerNodeType} from "../../../../../../../src/controllers/nodes/types/ControllerNodeType"
import {Company} from "../../../../../../../src/models/node-types/companies/Company"
import {RelAlreadyExistsError} from "../../../../../../../src/models/types/RelAlreadyExistsError"

test('Trying to create the same ›has-brand‹ relationship again', async () => {
    const company = await seedNode(ControllerNodeType.COMPANY)
    const brand = await seedNode(ControllerNodeType.BRAND)

    await expect(Company.createHasBrandRelationship(company.id, brand.id))
        .resolves
        .not.toThrow(RelAlreadyExistsError)

    await expect(Company.createHasBrandRelationship(company.id, brand.id))
        .rejects
        .toThrow(RelAlreadyExistsError)
})
