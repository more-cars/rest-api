import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {NodeTypeEnum} from "../../../../../../../src/controllers/nodes/types/NodeTypeEnum"
import {CarModelVariant} from "../../../../../../../src/models/car-model-variants/CarModelVariant"
import {RelationshipType} from "../../../../../../../src/models/relationships/types/RelationshipType"

test('Creating a ›is-featured-in-racing-game‹ relationship with valid data', async () => {
    const carModelVariant = await seedNode(NodeTypeEnum.CAR_MODEL_VARIANT)
    const racingGame = await seedNode(NodeTypeEnum.RACING_GAME)

    const createdRelationship = await CarModelVariant.createIsFeaturedInRacingGameRelationship(carModelVariant.id, racingGame.id)

    expect(createdRelationship.origin.id)
        .toEqual(carModelVariant.id)
    expect(createdRelationship.destination.id)
        .toEqual(racingGame.id)
    expect(createdRelationship.id)
        .toBeDefined()
    expect(createdRelationship.type)
        .toEqual(RelationshipType.CarModelVariantIsFeaturedInRacingGame)
    expect(createdRelationship.created_at)
        .toBeDefined()
    expect(createdRelationship.updated_at)
        .toBeDefined()
})
