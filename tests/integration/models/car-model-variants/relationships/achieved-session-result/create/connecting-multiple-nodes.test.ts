import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {ControllerNodeType} from "../../../../../../../src/controllers/nodes/types/ControllerNodeType"
import {seedNodes} from "../../../../../../_toolbox/dbSeeding/seedNodes"
import {CarModelVariant} from "../../../../../../../src/models/node-types/car-model-variants/CarModelVariant"
import {getRelationshipCollection} from "../../../../../../../src/db/relationships/getRelationshipCollection"
import {RelationshipType} from "../../../../../../../src/db/types/RelationshipType"
import {DbNodeType} from "../../../../../../../src/db/types/DbNodeType"

test('A CAR MODEL VARIANT can have multiple ›achieved-session-result‹ relationships', async () => {
    const carModelVariant = await seedNode(ControllerNodeType.CAR_MODEL_VARIANT)
    const sessionResultsAmount = 3
    const sessionResults = await seedNodes(ControllerNodeType.SESSION_RESULT, sessionResultsAmount)

    for (const sessionResult of sessionResults) {
        await CarModelVariant.createAchievedSessionResultRelationship(carModelVariant.properties.id, sessionResult.properties.id)
    }

    const relationships = await getRelationshipCollection(carModelVariant.properties.id, RelationshipType.CarModelVariantAchievedSessionResult, DbNodeType.SessionResult)

    expect(relationships.length)
        .toBe(sessionResultsAmount)
})
