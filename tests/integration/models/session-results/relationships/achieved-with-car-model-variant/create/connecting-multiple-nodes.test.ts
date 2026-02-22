import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../src/db/types/DbNodeType"
import {seedNodes} from "../../../../../../_toolbox/dbSeeding/seedNodes"
import {SessionResult} from "../../../../../../../src/models/node-types/session-results/SessionResult"
import {getRelationshipCollection} from "../../../../../../../src/db/relationships/getRelationshipCollection"
import {RelationshipType} from "../../../../../../../src/db/types/RelationshipType"

test('A SESSION RESULT cannot have multiple ›achieved-with-car-model-variant‹ relationships', async () => {
    const sessionResult = await seedNode(DbNodeType.SessionResult)
    const carModelVariantsAmount = 3
    const carModelVariants = await seedNodes(DbNodeType.CarModelVariant, carModelVariantsAmount)

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
