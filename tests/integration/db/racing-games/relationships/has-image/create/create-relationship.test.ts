import {describe, expect, test} from 'vitest'
import {createRelationship} from "../../../../../../../src/db/relationships/createRelationship"
import {DbRelationship} from "../../../../../../../src/db/types/DbRelationship"
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {NodeTypeEnum} from "../../../../../../../src/controllers/nodes/types/NodeTypeEnum"

describe('Creating a ›has-image‹ relationship', () => {
    test('with valid data', async () => {
        const racingGame = await seedNode(NodeTypeEnum.RACING_GAME)
        const image = await seedNode(NodeTypeEnum.IMAGE)

        const createdRelationship = await createRelationship(
            racingGame.id,
            image.id,
            DbRelationship.RacingGameHasImage,
        )

        expect(createdRelationship)
            .toHaveProperty('start_node_id', racingGame.id)
        expect(createdRelationship)
            .toHaveProperty('end_node_id', image.id)
        expect(createdRelationship)
            .toHaveProperty('relationship_id')
        expect(createdRelationship)
            .toHaveProperty('relationship_name', DbRelationship.RacingGameHasImage)
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
            DbRelationship.RacingGameHasImage,
        )

        expect(createdRelationship)
            .toEqual(false)
    })
})
