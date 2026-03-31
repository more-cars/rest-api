import {describe, expect, test} from 'vitest'
import {RacingGame} from "../../../../../../../../src/models/node-types/racing-games/RacingGame"
import {seedNode} from "../../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../../src/db/types/DbNodeType"
import {seedRelationshipForStartNode} from "../../../../../../../_toolbox/dbSeeding/seedRelationshipForStartNode"
import {RelationshipType} from "../../../../../../../../src/db/types/RelationshipType"
import {NodeNotFoundError} from "../../../../../../../../src/models/types/NodeNotFoundError"

describe('Requesting all ›has-video‹ relationships', () => {
    test('node and relationships exist', async () => {
        const racingGame = await seedNode(DbNodeType.RacingGame)
        await seedRelationshipForStartNode(racingGame.properties.id, DbNodeType.Video, RelationshipType.RacingGameHasVideo)
        await seedRelationshipForStartNode(racingGame.properties.id, DbNodeType.Video, RelationshipType.RacingGameHasVideo)

        const relationships = await RacingGame.getAllHasVideoRelationships(racingGame.properties.id)

        expect(relationships.length)
            .toBe(2)
    })

    test('node exists, but no relationships', async () => {
        const racingGame = await seedNode(DbNodeType.RacingGame)

        const relationships = await RacingGame.getAllHasVideoRelationships(racingGame.properties.id)

        expect(relationships.length)
            .toBe(0)
    })

    test('neither node, nor relationships exist', async () => {
        await expect(RacingGame.getAllHasVideoRelationships(-42))
            .rejects
            .toThrow(NodeNotFoundError)
    })
})
