import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../src/db/types/DbNodeType"
import {seedNodes} from "../../../../../../_toolbox/dbSeeding/seedNodes"
import {Brand} from "../../../../../../../src/models/node-types/brands/Brand"
import {getRelationshipCollection} from "../../../../../../../src/db/relationships/getRelationshipCollection"
import {RelationshipType} from "../../../../../../../src/db/types/RelationshipType"

test('A BRAND cannot have multiple ›belongs-to-company‹ relationships', async () => {
    const brand = await seedNode(DbNodeType.Brand)
    const companiesAmount = 3
    const companies = await seedNodes(DbNodeType.Company, companiesAmount)

    for (const company of companies) {
        await Brand.createBelongsToCompanyRelationship(brand.properties.id, company.properties.id)
    }

    const relationships = await getRelationshipCollection(brand.properties.id, RelationshipType.BrandBelongsToCompany, DbNodeType.Company)

    expect(relationships.length)
        .toBe(1)
})
