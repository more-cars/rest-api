import {describe, expect, test} from 'vitest'
import {RacingGame} from "../../../../../../../src/models/node-types/racing-games/RacingGame"
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {ControllerNodeType} from "../../../../../../../src/controllers/nodes/types/ControllerNodeType"
import {seedRelationshipForStartNode} from "../../../../../../_toolbox/dbSeeding/seedRelationshipForStartNode"
import {RelationshipType} from "../../../../../../../src/db/types/RelationshipType"
import {NodeNotFoundError} from "../../../../../../../src/models/types/NodeNotFoundError"

describe('Requesting all ›has-image‹ relationships', () => {
    test('node and relationships exist', async () => {
        const racingGame = await seedNode(ControllerNodeType.RacingGame)
        await seedRelationshipForStartNode(racingGame.properties.id, ControllerNodeType.Image, RelationshipType.RacingGameHasImage)
        await seedRelationshipForStartNode(racingGame.properties.id, ControllerNodeType.Image, RelationshipType.RacingGameHasImage)

        const relationships = await RacingGame.getAllHasImageRelationships(racingGame.properties.id)

        expect(relationships.length)
            .toBe(2)
    })

    test('node exists, but no relationships', async () => {
        const racingGame = await seedNode(ControllerNodeType.RacingGame)

        const relationships = await RacingGame.getAllHasImageRelationships(racingGame.properties.id)

        expect(relationships.length)
            .toBe(0)
    })

    test('neither node, nor relationships exist', async () => {
        await expect(RacingGame.getAllHasImageRelationships(-42))
            .rejects
            .toThrow(NodeNotFoundError)
    })
})
