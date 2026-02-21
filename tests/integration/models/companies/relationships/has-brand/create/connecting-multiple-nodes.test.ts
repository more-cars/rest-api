import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {ControllerNodeType} from "../../../../../../../src/controllers/nodes/types/ControllerNodeType"
import {seedNodes} from "../../../../../../_toolbox/dbSeeding/seedNodes"
import {Company} from "../../../../../../../src/models/node-types/companies/Company"
import {getRelationshipCollection} from "../../../../../../../src/db/relationships/getRelationshipCollection"
import {RelationshipType} from "../../../../../../../src/db/types/RelationshipType"
import {DbNodeType} from "../../../../../../../src/db/types/DbNodeType"

test('A COMPANY can have multiple ›has-brand‹ relationships', async () => {
    const company = await seedNode(ControllerNodeType.Company)
    const brandsAmount = 3
    const brands = await seedNodes(ControllerNodeType.Brand, brandsAmount)

    for (const brand of brands) {
        await Company.createHasBrandRelationship(company.properties.id, brand.properties.id)
    }

    const relationships = await getRelationshipCollection(
        company.properties.id,
        RelationshipType.CompanyHasBrand,
        DbNodeType.Brand,
    )

    expect(relationships.length)
        .toBe(brandsAmount)
})
