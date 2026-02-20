import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {ControllerNodeType} from "../../../../../../../src/controllers/nodes/types/ControllerNodeType"
import {seedNodes} from "../../../../../../_toolbox/dbSeeding/seedNodes"
import {Company} from "../../../../../../../src/models/node-types/companies/Company"
import {getRelationshipCollection} from "../../../../../../../src/db/relationships/getRelationshipCollection"
import {RelationshipType} from "../../../../../../../src/db/types/RelationshipType"
import {Neo4jNodeType} from "../../../../../../../src/db/types/Neo4jNodeType"

test('A COMPANY can have multiple ›has-brand‹ relationships', async () => {
    const company = await seedNode(ControllerNodeType.COMPANY)
    const brandsAmount = 3
    const brands = await seedNodes(ControllerNodeType.BRAND, brandsAmount)

    for (const brand of brands) {
        await Company.createHasBrandRelationship(company.id, brand.id)
    }

    const relationships = await getRelationshipCollection(
        company.id,
        RelationshipType.CompanyHasBrand,
        Neo4jNodeType.Brand,
    )

    expect(relationships.length)
        .toBe(brandsAmount)
})
