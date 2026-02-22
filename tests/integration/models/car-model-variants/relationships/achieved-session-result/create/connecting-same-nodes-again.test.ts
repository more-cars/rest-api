import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../src/db/types/DbNodeType"
import {CarModelVariant} from "../../../../../../../src/models/node-types/car-model-variants/CarModelVariant"
import {RelAlreadyExistsError} from "../../../../../../../src/models/types/RelAlreadyExistsError"

test('Trying to create the same ›achieved-session-result‹ relationship again', async () => {
    const carModelVariant = await seedNode(DbNodeType.CarModelVariant)
    const sessionResult = await seedNode(DbNodeType.SessionResult)

    await expect(CarModelVariant.createAchievedSessionResultRelationship(carModelVariant.properties.id, sessionResult.properties.id))
        .resolves
        .not.toThrow(RelAlreadyExistsError)

    await expect(CarModelVariant.createAchievedSessionResultRelationship(carModelVariant.properties.id, sessionResult.properties.id))
        .rejects
        .toThrow(RelAlreadyExistsError)
})
