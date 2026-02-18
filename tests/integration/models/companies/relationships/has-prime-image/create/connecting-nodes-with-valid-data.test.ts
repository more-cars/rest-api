import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {NodeTypeEnum} from "../../../../../../../src/controllers/nodes/types/NodeTypeEnum"
import {Company} from "../../../../../../../src/models/companies/Company"
import {RelType} from "../../../../../../../src/models/relationships/types/RelType"

test('Creating a ›has-prime-image‹ relationship with valid data', async () => {
    const company = await seedNode(NodeTypeEnum.COMPANY)
    const image = await seedNode(NodeTypeEnum.IMAGE)

    const createdRelationship = await Company.createHasPrimeImageRelationship(company.id, image.id)

    expect(createdRelationship.origin.id)
        .toEqual(company.id)
    expect(createdRelationship.destination.id)
        .toEqual(image.id)
    expect(createdRelationship.id)
        .toBeDefined()
    expect(createdRelationship.type)
        .toEqual(RelType.CompanyHasPrimeImage)
    expect(createdRelationship.created_at)
        .toBeDefined()
    expect(createdRelationship.updated_at)
        .toBeDefined()
})
