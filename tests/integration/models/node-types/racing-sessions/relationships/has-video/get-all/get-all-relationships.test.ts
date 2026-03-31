import {describe, expect, test} from 'vitest'
import {RacingSession} from "../../../../../../../../src/models/node-types/racing-sessions/RacingSession"
import {seedNode} from "../../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../../src/db/types/DbNodeType"
import {seedRelationshipForStartNode} from "../../../../../../../_toolbox/dbSeeding/seedRelationshipForStartNode"
import {RelationshipType} from "../../../../../../../../src/db/types/RelationshipType"
import {NodeNotFoundError} from "../../../../../../../../src/models/types/NodeNotFoundError"

describe('Requesting all ›has-video‹ relationships', () => {
    test('node and relationships exist', async () => {
        const racingSession = await seedNode(DbNodeType.RacingSession)
        await seedRelationshipForStartNode(racingSession.properties.id, DbNodeType.Video, RelationshipType.RacingSessionHasVideo)
        await seedRelationshipForStartNode(racingSession.properties.id, DbNodeType.Video, RelationshipType.RacingSessionHasVideo)

        const relationships = await RacingSession.getAllHasVideoRelationships(racingSession.properties.id)

        expect(relationships.length)
            .toBe(2)
    })

    test('node exists, but no relationships', async () => {
        const racingSession = await seedNode(DbNodeType.RacingSession)

        const relationships = await RacingSession.getAllHasVideoRelationships(racingSession.properties.id)

        expect(relationships.length)
            .toBe(0)
    })

    test('neither node, nor relationships exist', async () => {
        await expect(RacingSession.getAllHasVideoRelationships(-42))
            .rejects
            .toThrow(NodeNotFoundError)
    })
})
