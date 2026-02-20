import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {seedNodes} from "../../../../../../_toolbox/dbSeeding/seedNodes"
import {ControllerNodeType} from "../../../../../../../src/controllers/nodes/types/ControllerNodeType"
import {SessionResult} from "../../../../../../../src/models/node-types/session-results/SessionResult"
import {getRelationshipCollection} from "../../../../../../../src/db/relationships/getRelationshipCollection"
import {RelationshipType} from "../../../../../../../src/db/types/RelationshipType"
import {DbNodeType} from "../../../../../../../src/db/types/DbNodeType"

test('A SESSION RESULT cannot have multiple ›achieved-with-car-model-variant‹ relationships', async () => {
    const sessionResult = await seedNode(ControllerNodeType.SESSION_RESULT)
    const carModelVariantsAmount = 3
    const carModelVariants = await seedNodes(ControllerNodeType.CAR_MODEL_VARIANT, carModelVariantsAmount)

    for (const carModelVariant of carModelVariants) {
        await SessionResult.createAchievedWithCarModelVariantRelationship(sessionResult.properties.id, carModelVariant.properties.id)
    }

    const relationships = await getRelationshipCollection(
        sessionResult.properties.id,
        RelationshipType.SessionResultAchievedWithCarModelVariant,
        DbNodeType.CarModelVariant,
    )

    expect(relationships.length)
        .toBe(1)
})
