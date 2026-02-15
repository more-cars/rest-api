import {expect, test} from 'vitest'
import {getRelationshipCollection} from "../../../../../../../src/db/relationships/getRelationshipCollection"
import {DbRelationship} from "../../../../../../../src/db/types/DbRelationship"
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {NodeTypeEnum} from "../../../../../../../src/controllers/nodes/types/NodeTypeEnum"
import {NodeTypeLabel} from "../../../../../../../src/db/NodeTypeLabel"
import {RelationshipDirection} from "../../../../../../../src/db/types/RelationshipDirection"

test('An empty list should be returned when no IMAGE is connected to the CAR MODEL', async () => {
    const carModel = await seedNode(NodeTypeEnum.CAR_MODEL)

    const relationships = await getRelationshipCollection(
        carModel.id,
        DbRelationship.NodeHasImage,
        NodeTypeLabel.Image,
    )

    expect(relationships.length)
        .toBe(0)
})
