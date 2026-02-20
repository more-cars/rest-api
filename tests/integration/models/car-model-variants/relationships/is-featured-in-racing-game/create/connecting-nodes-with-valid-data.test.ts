import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {ControllerNodeType} from "../../../../../../../src/controllers/nodes/types/ControllerNodeType"
import {CarModelVariant} from "../../../../../../../src/models/node-types/car-model-variants/CarModelVariant"
import {RelType} from "../../../../../../../src/models/relationships/types/RelType"

test('Creating a ›is-featured-in-racing-game‹ relationship with valid data', async () => {
    const carModelVariant = await seedNode(ControllerNodeType.CAR_MODEL_VARIANT)
    const racingGame = await seedNode(ControllerNodeType.RACING_GAME)

    const createdRelationship = await CarModelVariant.createIsFeaturedInRacingGameRelationship(carModelVariant.id, racingGame.id)

    expect(createdRelationship.origin.properties.id)
        .toEqual(carModelVariant.id)
    expect(createdRelationship.destination.properties.id)
        .toEqual(racingGame.id)
    expect(createdRelationship.id)
        .toBeDefined()
    expect(createdRelationship.type)
        .toEqual(RelType.CarModelVariantIsFeaturedInRacingGame)
    expect(createdRelationship.created_at)
        .toBeDefined()
    expect(createdRelationship.updated_at)
        .toBeDefined()
})
