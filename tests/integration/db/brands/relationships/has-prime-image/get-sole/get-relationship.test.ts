import {describe, expect, test} from 'vitest'
import {getRelationshipCollection} from "../../../../../../../src/db/relationships/getRelationshipCollection"
import {DbRelationship} from "../../../../../../../src/db/types/DbRelationship"
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {NodeTypeEnum} from "../../../../../../../src/controllers/nodes/types/NodeTypeEnum"
import {seedRelationship} from "../../../../../../_toolbox/dbSeeding/seedRelationship"
import {NodeTypeLabel} from "../../../../../../../src/db/NodeTypeLabel"
import {RelationshipDirection} from "../../../../../../../src/db/types/RelationshipDirection"

describe('Requesting a ›has-prime-image‹ relationship', () => {
    test('node and relationship exist', async () => {
        const relationship = await seedRelationship(NodeTypeEnum.BRAND, NodeTypeEnum.IMAGE, DbRelationship.BrandHasPrimeImage)

        const relationships = await getRelationshipCollection(
            relationship.start_node_id,
            DbRelationship.BrandHasPrimeImage,
            NodeTypeLabel.Image,
            RelationshipDirection.FORWARD,
        )

        expect(relationships.length)
            .toBe(1)
    })

    test('node exists, but not the relationship', async () => {
        const brand = await seedNode(NodeTypeEnum.BRAND)

        const relationships = await getRelationshipCollection(
            brand.id,
            DbRelationship.BrandHasPrimeImage,
            NodeTypeLabel.Image,
            RelationshipDirection.FORWARD,
        )

        expect(relationships.length)
            .toBe(0)
    })

    test('neither node, nor relationship exist', async () => {
        const relationships = await getRelationshipCollection(
            -42,
            DbRelationship.BrandHasPrimeImage,
            NodeTypeLabel.Image,
            RelationshipDirection.FORWARD,
        )

        expect(relationships.length)
            .toBe(0)
    })
})
