import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {seedNodes} from "../../../../../../_toolbox/dbSeeding/seedNodes"
import {NodeTypeEnum} from "../../../../../../../src/controllers/nodes/types/NodeTypeEnum"
import {SessionResult} from "../../../../../../../src/models/session-results/SessionResult"
import {getRelationshipCollection} from "../../../../../../../src/db/relationships/getRelationshipCollection"
import {DbRelationship} from "../../../../../../../src/db/types/DbRelationship"

test('A SESSION RESULT cannot have multiple ›achieved-with-car-model-variant‹ relationships', async () => {
    const sessionResult = await seedNode(NodeTypeEnum.SESSION_RESULT)
    const carModelVariantsAmount = 3
    const carModelVariants = await seedNodes(NodeTypeEnum.CAR_MODEL_VARIANT, carModelVariantsAmount)

    for (const carModelVariant of carModelVariants) {
        await SessionResult.createAchievedWithCarModelVariantRelationship(sessionResult.id, carModelVariant.id)
    }

    const relationships = await getRelationshipCollection(sessionResult.id, DbRelationship.SessionResultAchievedWithCarModelVariant)

    expect(relationships.length)
        .toBe(1)
})
