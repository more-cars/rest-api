import {describe, expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {NodeTypeEnum} from "../../../../../../../src/controllers/nodes/types/NodeTypeEnum"
import {seedRelationshipForStartNode} from "../../../../../../_toolbox/dbSeeding/seedRelationshipForStartNode"
import {getRelationshipCollection} from "../../../../../../../src/db/relationships/getRelationshipCollection"
import {DbRelationship} from "../../../../../../../src/db/types/DbRelationship"
import {NodeTypeLabel} from "../../../../../../../src/db/NodeTypeLabel"
import {RelationshipDirection} from "../../../../../../../src/db/types/RelationshipDirection"

describe('Requesting all ›achieved-session-result‹ relationships', () => {
    test('node and relationships exist', async () => {
        const carModelVariant = await seedNode(NodeTypeEnum.CAR_MODEL_VARIANT)
        await seedRelationshipForStartNode(carModelVariant.id, NodeTypeEnum.SESSION_RESULT, DbRelationship.CarModelVariantAchievedSessionResult)
        await seedRelationshipForStartNode(carModelVariant.id, NodeTypeEnum.SESSION_RESULT, DbRelationship.CarModelVariantAchievedSessionResult)

        const relationships = await getRelationshipCollection(
            carModelVariant.id,
            DbRelationship.CarModelVariantAchievedSessionResult,
            NodeTypeLabel.SessionResult,
            RelationshipDirection.FORWARD,
        )

        expect(relationships.length)
            .toBe(2)
    })

    test('node exists, but no relationships', async () => {
        const carModelVariant = await seedNode(NodeTypeEnum.CAR_MODEL_VARIANT)

        const relationships = await getRelationshipCollection(
            carModelVariant.id,
            DbRelationship.CarModelVariantAchievedSessionResult,
            NodeTypeLabel.SessionResult,
            RelationshipDirection.FORWARD,
        )

        expect(relationships.length)
            .toBe(0)
    })

    test('neither node, nor relationships exist', async () => {
        const relationships = await getRelationshipCollection(
            -42,
            DbRelationship.CarModelVariantAchievedSessionResult,
            NodeTypeLabel.SessionResult,
            RelationshipDirection.FORWARD,
        )

        expect(relationships.length)
            .toBe(0)
    })
})
