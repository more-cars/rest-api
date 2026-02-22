import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../src/db/types/DbNodeType"
import {RacingGame} from "../../../../../../../src/models/node-types/racing-games/RacingGame"
import {RelAlreadyExistsError} from "../../../../../../../src/models/types/RelAlreadyExistsError"

test('Trying to create the same ›features-car-model-variant‹ relationship again', async () => {
    const racingGame = await seedNode(DbNodeType.RacingGame)
    const carModelVariant = await seedNode(DbNodeType.CarModelVariant)

    await expect(RacingGame.createFeaturesCarModelVariantRelationship(racingGame.properties.id, carModelVariant.properties.id))
        .resolves
        .not.toThrow(RelAlreadyExistsError)

    await expect(RacingGame.createFeaturesCarModelVariantRelationship(racingGame.properties.id, carModelVariant.properties.id))
        .rejects
        .toThrow(RelAlreadyExistsError)
})
