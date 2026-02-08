import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {NodeTypeEnum} from "../../../../../../../src/controllers/nodes/types/NodeTypeEnum"
import {Brand} from "../../../../../../../src/models/brands/Brand"
import {BrandRelationship} from "../../../../../../../src/models/brands/types/BrandRelationship"

test('Creating a ›belongs-to-company‹ relationship with valid data', async () => {
    const brand = await seedNode(NodeTypeEnum.BRAND)
    const company = await seedNode(NodeTypeEnum.COMPANY)

    const createdRelationship = await Brand.createBelongsToCompanyRelationship(brand.id, company.id)

    expect(createdRelationship.origin.id)
        .toEqual(brand.id)
    expect(createdRelationship.destination.id)
        .toEqual(company.id)
    expect(createdRelationship.id)
        .toBeDefined()
    expect(createdRelationship.type)
        .toEqual(BrandRelationship.belongsToCompany)
    expect(createdRelationship.created_at)
        .toBeDefined()
    expect(createdRelationship.updated_at)
        .toBeDefined()
})
