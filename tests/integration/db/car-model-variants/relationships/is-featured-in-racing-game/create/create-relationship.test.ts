import {describe, expect, test} from 'vitest'
import {createRelationship} from "../../../../../../../src/db/relationships/createRelationship"
import {DbRelationship} from "../../../../../../../src/db/types/DbRelationship"
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {NodeTypeEnum} from "../../../../../../../src/controllers/nodes/types/NodeTypeEnum"

describe('Creating a ›is-featured-in-racing-game‹ relationship', () => {
    test('with valid data', async () => {
        const carModelVariant = await seedNode(NodeTypeEnum.CAR_MODEL_VARIANT)
        const racingGame = await seedNode(NodeTypeEnum.RACING_GAME)

        const createdRelationship = await createRelationship(
            carModelVariant.id,
            racingGame.id,
            DbRelationship.CarModelVariantIsFeaturedInRacingGame,
        )

        expect(createdRelationship)
            .toHaveProperty('start_node_id', carModelVariant.id)
        expect(createdRelationship)
            .toHaveProperty('end_node_id', racingGame.id)
        expect(createdRelationship)
            .toHaveProperty('relationship_id')
        expect(createdRelationship)
            .toHaveProperty('relationship_name', DbRelationship.CarModelVariantIsFeaturedInRacingGame)
        expect(createdRelationship)
            .toHaveProperty('created_at')
        expect(createdRelationship)
            .toHaveProperty('updated_at')
    })

    test('with invalid data', async () => {
        const carModelVariant = await seedNode(NodeTypeEnum.CAR_MODEL_VARIANT)

        const createdRelationship = await createRelationship(
            carModelVariant.id,
            -42,
            DbRelationship.CarModelVariantIsFeaturedInRacingGame,
        )

        expect(createdRelationship)
            .toEqual(false)
    })
})
