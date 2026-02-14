import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {NodeTypeEnum} from "../../../../../../../src/controllers/nodes/types/NodeTypeEnum"
import {seedNodes} from "../../../../../../_toolbox/dbSeeding/seedNodes"
import {CarModelVariant} from "../../../../../../../src/models/car-model-variants/CarModelVariant"
import {getRelationshipCollection} from "../../../../../../../src/db/relationships/getRelationshipCollection"
import {DbRelationship} from "../../../../../../../src/db/types/DbRelationship"
import {NodeTypeLabel} from "../../../../../../../src/db/NodeTypeLabel"
import {RelationshipDirection} from "../../../../../../../src/db/types/RelationshipDirection"

test('A CAR MODEL VARIANT can have multiple ›achieved-session-result‹ relationships', async () => {
    const carModelVariant = await seedNode(NodeTypeEnum.CAR_MODEL_VARIANT)
    const sessionResultsAmount = 3
    const sessionResults = await seedNodes(NodeTypeEnum.SESSION_RESULT, sessionResultsAmount)

    for (const sessionResult of sessionResults) {
        await CarModelVariant.createAchievedSessionResultRelationship(carModelVariant.id, sessionResult.id)
    }

    const relationships = await getRelationshipCollection(carModelVariant.id, DbRelationship.CarModelVariantAchievedSessionResult, NodeTypeLabel.SessionResult, RelationshipDirection.FORWARD)

    expect(relationships.length)
        .toBe(sessionResultsAmount)
})
