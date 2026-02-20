import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {ControllerNodeType} from "../../../../../../../src/controllers/nodes/types/ControllerNodeType"
import {seedNodes} from "../../../../../../_toolbox/dbSeeding/seedNodes"
import {Brand} from "../../../../../../../src/models/node-types/brands/Brand"
import {getRelationshipCollection} from "../../../../../../../src/db/relationships/getRelationshipCollection"
import {RelationshipType} from "../../../../../../../src/db/types/RelationshipType"
import {DbNodeType} from "../../../../../../../src/db/types/DbNodeType"

test('A BRAND cannot have multiple ›belongs-to-company‹ relationships', async () => {
    const brand = await seedNode(ControllerNodeType.BRAND)
    const companiesAmount = 3
    const companies = await seedNodes(ControllerNodeType.COMPANY, companiesAmount)

    for (const company of companies) {
        await Brand.createBelongsToCompanyRelationship(brand.id, company.id)
    }

    const relationships = await getRelationshipCollection(brand.id, RelationshipType.BrandBelongsToCompany, DbNodeType.Company)

    expect(relationships.length)
        .toBe(1)
})
