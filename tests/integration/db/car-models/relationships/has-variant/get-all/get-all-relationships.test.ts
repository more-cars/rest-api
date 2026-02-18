import {describe, expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {NodeTypeEnum} from "../../../../../../../src/controllers/nodes/types/NodeTypeEnum"
import {seedRelationshipForStartNode} from "../../../../../../_toolbox/dbSeeding/seedRelationshipForStartNode"
import {getRelationshipCollection} from "../../../../../../../src/db/relationships/getRelationshipCollection"
import {RelationshipType} from "../../../../../../../src/db/types/RelationshipType"
import {NodeTypeLabel} from "../../../../../../../src/db/NodeTypeLabel"

describe('Requesting all ›has-variant‹ relationships', () => {
    test('node and relationships exist', async () => {
        const carModel = await seedNode(NodeTypeEnum.CAR_MODEL)
        await seedRelationshipForStartNode(carModel.id, NodeTypeEnum.CAR_MODEL_VARIANT, RelationshipType.CarModelHasVariant)
        await seedRelationshipForStartNode(carModel.id, NodeTypeEnum.CAR_MODEL_VARIANT, RelationshipType.CarModelHasVariant)

        const relationships = await getRelationshipCollection(
            carModel.id,
            RelationshipType.CarModelHasVariant,
            NodeTypeLabel.CarModelVariant,
        )

        expect(relationships.length)
            .toBe(2)
    })

    test('node exists, but no relationships', async () => {
        const carModel = await seedNode(NodeTypeEnum.CAR_MODEL)

        const relationships = await getRelationshipCollection(
            carModel.id,
            RelationshipType.CarModelHasVariant,
            NodeTypeLabel.CarModelVariant,
        )

        expect(relationships.length)
            .toBe(0)
    })

    test('neither node, nor relationships exist', async () => {
        const relationships = await getRelationshipCollection(
            -42,
            RelationshipType.CarModelHasVariant,
            NodeTypeLabel.CarModelVariant,
        )

        expect(relationships.length)
            .toBe(0)
    })
})
