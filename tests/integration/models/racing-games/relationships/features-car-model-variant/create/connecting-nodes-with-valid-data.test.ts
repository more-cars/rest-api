import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {ControllerNodeType} from "../../../../../../../src/controllers/nodes/types/ControllerNodeType"
import {RacingGame} from "../../../../../../../src/models/node-types/racing-games/RacingGame"
import {RelType} from "../../../../../../../src/models/relationships/types/RelType"

test('Creating a ›features-car-model-variant‹ relationship with valid data', async () => {
    const racingGame = await seedNode(ControllerNodeType.RACING_GAME)
    const carModelVariant = await seedNode(ControllerNodeType.CAR_MODEL_VARIANT)

    const createdRelationship = await RacingGame.createFeaturesCarModelVariantRelationship(racingGame.properties.id, carModelVariant.properties.id)

    expect(createdRelationship.origin.properties.id)
        .toEqual(racingGame.properties.id)
    expect(createdRelationship.destination.properties.id)
        .toEqual(carModelVariant.properties.id)
    expect(createdRelationship.id)
        .toBeDefined()
    expect(createdRelationship.type)
        .toEqual(RelType.RacingGameFeaturesCarModelVariant)
    expect(createdRelationship.created_at)
        .toBeDefined()
    expect(createdRelationship.updated_at)
        .toBeDefined()
})
