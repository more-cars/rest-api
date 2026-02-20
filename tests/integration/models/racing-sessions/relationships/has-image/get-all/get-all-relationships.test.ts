import {describe, expect, test} from 'vitest'
import {RacingSession} from "../../../../../../../src/models/node-types/racing-sessions/RacingSession"
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {ControllerNodeType} from "../../../../../../../src/controllers/nodes/types/ControllerNodeType"
import {seedRelationshipForStartNode} from "../../../../../../_toolbox/dbSeeding/seedRelationshipForStartNode"
import {RelationshipType} from "../../../../../../../src/db/types/RelationshipType"
import {NodeNotFoundError} from "../../../../../../../src/models/types/NodeNotFoundError"

describe('Requesting all ›has-image‹ relationships', () => {
    test('node and relationships exist', async () => {
        const racingSession = await seedNode(ControllerNodeType.RACING_SESSION)
        await seedRelationshipForStartNode(racingSession.id, ControllerNodeType.IMAGE, RelationshipType.RacingSessionHasImage)
        await seedRelationshipForStartNode(racingSession.id, ControllerNodeType.IMAGE, RelationshipType.RacingSessionHasImage)

        const relationships = await RacingSession.getAllHasImageRelationships(racingSession.id)

        expect(relationships.length)
            .toBe(2)
    })

    test('node exists, but no relationships', async () => {
        const racingSession = await seedNode(ControllerNodeType.RACING_SESSION)

        const relationships = await RacingSession.getAllHasImageRelationships(racingSession.id)

        expect(relationships.length)
            .toBe(0)
    })

    test('neither node, nor relationships exist', async () => {
        await expect(RacingSession.getAllHasImageRelationships(-42))
            .rejects
            .toThrow(NodeNotFoundError)
    })
})
