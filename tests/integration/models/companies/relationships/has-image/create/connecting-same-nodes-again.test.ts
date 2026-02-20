import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {ControllerNodeType} from "../../../../../../../src/controllers/nodes/types/ControllerNodeType"
import {Company} from "../../../../../../../src/models/node-types/companies/Company"
import {RelAlreadyExistsError} from "../../../../../../../src/models/types/RelAlreadyExistsError"

test('Trying to create the same ›has-image‹ relationship again', async () => {
    const company = await seedNode(ControllerNodeType.COMPANY)
    const image = await seedNode(ControllerNodeType.IMAGE)

    await expect(Company.createHasImageRelationship(company.properties.id, image.properties.id))
        .resolves
        .not.toThrow(RelAlreadyExistsError)

    await expect(Company.createHasImageRelationship(company.properties.id, image.properties.id))
        .rejects
        .toThrow(RelAlreadyExistsError)
})
