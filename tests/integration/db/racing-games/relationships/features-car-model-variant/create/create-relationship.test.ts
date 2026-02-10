import {describe, expect, test} from 'vitest'
import {createRelationship} from "../../../../../../../src/db/relationships/createRelationship"
import {DbRelationship} from "../../../../../../../src/db/types/DbRelationship"
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {NodeTypeEnum} from "../../../../../../../src/controllers/nodes/types/NodeTypeEnum"
import {RacingGameRelationship} from "../../../../../../../src/models/racing-games/types/RacingGameRelationship"

describe('Creating a ›features-car-model-variant‹ relationship', () => {
    test('with valid data', async () => {
        const racingGame = await seedNode(NodeTypeEnum.RACING_GAME)
        const carModelVariant = await seedNode(NodeTypeEnum.CAR_MODEL_VARIANT)

        const createdRelationship = await createRelationship(
            racingGame.id,
            carModelVariant.id,
            DbRelationship.RacingGameFeaturesCarModelVariant,
        )

        expect(createdRelationship)
            .toHaveProperty('start_node_id', racingGame.id)
        expect(createdRelationship)
            .toHaveProperty('end_node_id', carModelVariant.id)
        expect(createdRelationship)
            .toHaveProperty('relationship_id')
        expect(createdRelationship)
            .toHaveProperty('relationship_name', RacingGameRelationship.featuresCarModelVariant)
        expect(createdRelationship)
            .toHaveProperty('created_at')
        expect(createdRelationship)
            .toHaveProperty('updated_at')
    })

    test('with invalid data', async () => {
        const racingGame = await seedNode(NodeTypeEnum.RACING_GAME)

        const createdRelationship = await createRelationship(
            racingGame.id,
            -42,
            DbRelationship.RacingGameFeaturesCarModelVariant,
        )

        expect(createdRelationship)
            .toEqual(false)
    })
})
