import {describe, expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {seedRelationship} from "../../../../../../_toolbox/dbSeeding/seedRelationship"
import {NodeTypeEnum} from "../../../../../../../src/controllers/nodes/types/NodeTypeEnum"
import {getRelationshipCollection} from "../../../../../../../src/db/relationships/getRelationshipCollection"
import {DbRelationship} from "../../../../../../../src/db/types/DbRelationship"
import {NodeTypeLabel} from "../../../../../../../src/db/NodeTypeLabel"
import {RelationshipDirection} from "../../../../../../../src/db/types/RelationshipDirection"

describe('Requesting a ›has-prime-image‹ relationship', () => {
    test('node and relationship exist', async () => {
        const relationship = await seedRelationship(NodeTypeEnum.CAR_MODEL_VARIANT, NodeTypeEnum.IMAGE, DbRelationship.CarModelVariantHasPrimeImage)

        const relationships = await getRelationshipCollection(
            relationship.start_node_id,
            DbRelationship.CarModelVariantHasPrimeImage,
            NodeTypeLabel.Image,
            RelationshipDirection.FORWARD,
        )

        expect(relationships.length)
            .toBe(1)
    })

    test('node exists, but not the relationship', async () => {
        const carModelVariant = await seedNode(NodeTypeEnum.CAR_MODEL_VARIANT)

        const relationships = await getRelationshipCollection(
            carModelVariant.id,
            DbRelationship.CarModelVariantHasPrimeImage,
            NodeTypeLabel.Image,
            RelationshipDirection.FORWARD,
        )

        expect(relationships.length)
            .toBe(0)
    })

    test('neither node, nor relationship exist', async () => {
        const relationships = await getRelationshipCollection(
            -42,
            DbRelationship.CarModelVariantHasPrimeImage,
            NodeTypeLabel.Image,
            RelationshipDirection.FORWARD,
        )

        expect(relationships.length)
            .toBe(0)
    })
})
