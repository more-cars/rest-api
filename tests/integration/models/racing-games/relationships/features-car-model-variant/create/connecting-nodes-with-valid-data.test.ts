import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {NodeTypeEnum} from "../../../../../../../src/controllers/nodes/types/NodeTypeEnum"
import {RacingGame} from "../../../../../../../src/models/racing-games/RacingGame"
import {RelType} from "../../../../../../../src/models/relationships/types/RelType"

test('Creating a ›features-car-model-variant‹ relationship with valid data', async () => {
    const racingGame = await seedNode(NodeTypeEnum.RACING_GAME)
    const carModelVariant = await seedNode(NodeTypeEnum.CAR_MODEL_VARIANT)

    const createdRelationship = await RacingGame.createFeaturesCarModelVariantRelationship(racingGame.id, carModelVariant.id)

    expect(createdRelationship.origin.id)
        .toEqual(racingGame.id)
    expect(createdRelationship.destination.id)
        .toEqual(carModelVariant.id)
    expect(createdRelationship.id)
        .toBeDefined()
    expect(createdRelationship.type)
        .toEqual(RelType.RacingGameFeaturesCarModelVariant)
    expect(createdRelationship.created_at)
        .toBeDefined()
    expect(createdRelationship.updated_at)
        .toBeDefined()
})
