import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {ControllerNodeType} from "../../../../../../../src/controllers/nodes/types/ControllerNodeType"
import {Company} from "../../../../../../../src/models/node-types/companies/Company"
import {RelType} from "../../../../../../../src/models/relationships/types/RelType"

test('Creating a ›has-prime-image‹ relationship with valid data', async () => {
    const company = await seedNode(ControllerNodeType.COMPANY)
    const image = await seedNode(ControllerNodeType.IMAGE)

    const createdRelationship = await Company.createHasPrimeImageRelationship(company.id, image.id)

    expect(createdRelationship.origin.properties.id)
        .toEqual(company.id)
    expect(createdRelationship.destination.properties.id)
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
