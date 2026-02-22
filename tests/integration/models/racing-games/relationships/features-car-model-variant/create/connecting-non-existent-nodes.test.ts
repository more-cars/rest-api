import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../src/db/types/DbNodeType"
import {RacingGame} from "../../../../../../../src/models/node-types/racing-games/RacingGame"
import {NodeNotFoundError} from "../../../../../../../src/models/types/NodeNotFoundError"

test('Trying to create a ›features-car-model-variant‹ relationship with nodes that do not exist', async () => {
    const racingGame = await seedNode(DbNodeType.RacingGame)
    const carModelVariant = await seedNode(DbNodeType.CarModelVariant)

    await expect(RacingGame.createFeaturesCarModelVariantRelationship(-42, carModelVariant.properties.id))
        .rejects
        .toThrow(NodeNotFoundError)

    await expect(RacingGame.createFeaturesCarModelVariantRelationship(racingGame.properties.id, -43))
        .rejects
        .toThrow(NodeNotFoundError)

    await expect(RacingGame.createFeaturesCarModelVariantRelationship(-44, -45))
        .rejects
        .toThrow(NodeNotFoundError)
})
