import {expect, test} from 'vitest'
import {createRelationship} from "../../../../../../../src/db/relationships/createRelationship"
import {getRelationshipCollection} from "../../../../../../../src/db/relationships/getRelationshipCollection"
import {DbRelationship} from "../../../../../../../src/db/types/DbRelationship"
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {NodeTypeEnum} from "../../../../../../../src/controllers/nodes/types/NodeTypeEnum"
import {NodeTypeLabel} from "../../../../../../../src/db/NodeTypeLabel"
import {RelationshipDirection} from "../../../../../../../src/db/types/RelationshipDirection"

test('Requesting the relationship between BRAND and attached IMAGE',
    async () => {
        const brand = await seedNode(NodeTypeEnum.BRAND)
        const image = await seedNode(NodeTypeEnum.IMAGE)

        await createRelationship(
            brand.id,
            image.id,
            DbRelationship.NodeHasImage,
        )

        const relationships = await getRelationshipCollection(
            brand.id,
            DbRelationship.NodeHasImage,
            NodeTypeLabel.Image,
        )

        expect(relationships.length)
            .toBe(1)

        expect(relationships[0].start_node_id)
            .toBe(brand.id)

        expect(relationships[0].end_node_id)
            .toBe(image.id)
    })
