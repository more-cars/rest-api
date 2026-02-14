import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {NodeTypeEnum} from "../../../../../../../src/controllers/nodes/types/NodeTypeEnum"
import {seedNodes} from "../../../../../../_toolbox/dbSeeding/seedNodes"
import {Brand} from "../../../../../../../src/models/brands/Brand"
import {getRelationshipCollection} from "../../../../../../../src/db/relationships/getRelationshipCollection"
import {DbRelationship} from "../../../../../../../src/db/types/DbRelationship"
import {NodeTypeLabel} from "../../../../../../../src/db/NodeTypeLabel"
import {RelationshipDirection} from "../../../../../../../src/db/types/RelationshipDirection"

test('A BRAND cannot have multiple ›belongs-to-company‹ relationships', async () => {
    const brand = await seedNode(NodeTypeEnum.BRAND)
    const companiesAmount = 3
    const companies = await seedNodes(NodeTypeEnum.COMPANY, companiesAmount)

    for (const company of companies) {
        await Brand.createBelongsToCompanyRelationship(brand.id, company.id)
    }

    const relationships = await getRelationshipCollection(brand.id, DbRelationship.BrandBelongsToCompany, NodeTypeLabel.Company, RelationshipDirection.REVERSE)

    expect(relationships.length)
        .toBe(1)
})
