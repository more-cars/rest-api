import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {NodeTypeEnum} from "../../../../../../../src/controllers/nodes/types/NodeTypeEnum"
import {getRelationshipCollection} from "../../../../../../../src/db/relationships/getRelationshipCollection"
import {DbRelationship} from "../../../../../../../src/db/types/DbRelationship"
import {NodeTypeLabel} from "../../../../../../../src/db/NodeTypeLabel"
import {RelationshipDirection} from "../../../../../../../src/db/types/RelationshipDirection"

test('Expecting an empty list when the relationship does not exist', async () => {
    const company = await seedNode(NodeTypeEnum.COMPANY)

    const relationships = await getRelationshipCollection(
        company.id,
        DbRelationship.CompanyHasPrimeImage,
        NodeTypeLabel.Image,
    )

    expect(relationships.length)
        .toBe(0)
})