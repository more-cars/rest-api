import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../src/db/types/DbNodeType"
import {SessionResult} from "../../../../../../../src/models/node-types/session-results/SessionResult"
import {RelAlreadyExistsError} from "../../../../../../../src/models/types/RelAlreadyExistsError"

test('Trying to create the same ›achieved-with-car-model-variant‹ relationship again', async () => {
    const sessionResult = await seedNode(DbNodeType.SessionResult)
    const carModelVariant = await seedNode(DbNodeType.CarModelVariant)

    await expect(SessionResult.createAchievedWithCarModelVariantRelationship(sessionResult.properties.id, carModelVariant.properties.id))
        .resolves
        .not.toThrow(RelAlreadyExistsError)

    await expect(SessionResult.createAchievedWithCarModelVariantRelationship(sessionResult.properties.id, carModelVariant.properties.id))
        .rejects
        .toThrow(RelAlreadyExistsError)
})
