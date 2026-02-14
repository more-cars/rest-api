import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {NodeTypeEnum} from "../../../../../../../src/controllers/nodes/types/NodeTypeEnum"
import {getRelationshipCollection} from "../../../../../../../src/db/relationships/getRelationshipCollection"
import {DbRelationship} from "../../../../../../../src/db/types/DbRelationship"
import {NodeTypeLabel} from "../../../../../../../src/db/NodeTypeLabel"
import {RelationshipDirection} from "../../../../../../../src/db/types/RelationshipDirection"

test('An empty list should be returned when no IMAGE is connected to the BRAND', async () => {
    const brand = await seedNode(NodeTypeEnum.BRAND)

    const relationships = await getRelationshipCollection(
        brand.id,
        DbRelationship.NodeHasImage,
        NodeTypeLabel.Image,
        RelationshipDirection.FORWARD,
    )

    expect(relationships.length)
        .toBe(0)
})
