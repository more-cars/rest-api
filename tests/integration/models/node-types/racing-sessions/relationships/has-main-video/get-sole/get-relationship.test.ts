import {describe, expect, test} from 'vitest'
import {seedRelationship} from "../../../../../../../_toolbox/dbSeeding/seedRelationship"
import {DbNodeType} from "../../../../../../../../src/db/types/DbNodeType"
import {RelationshipType} from "../../../../../../../../src/db/types/RelationshipType"
import {RacingSession} from "../../../../../../../../src/models/node-types/racing-sessions/RacingSession"
import {validateJson} from "../../../../../../../_toolbox/validateJson"
import {RelationshipSchema} from "../../../../../../../_toolbox/schemas/model/RelationshipSchema"
import {seedNode} from "../../../../../../../_toolbox/dbSeeding/seedNode"
import {RelNotFoundError} from "../../../../../../../../src/models/types/RelNotFoundError"
import {NodeNotFoundError} from "../../../../../../../../src/models/types/NodeNotFoundError"

describe('Requesting a ›has-main-video‹ relationship', () => {
    test('node and relationship exist', async () => {
        const expectedRelationship = await seedRelationship(DbNodeType.RacingSession, DbNodeType.Video, RelationshipType.RacingSessionHasMainVideo)
        const expectedRacingSessionId = expectedRelationship.start_node.properties.id
        const expectedVideoId = expectedRelationship.end_node.properties.id
        const actualRelationship = await RacingSession.getHasMainVideoRelationship(expectedRacingSessionId)

        expect(validateJson(actualRelationship, RelationshipSchema))
            .toBeTruthy()

        expect(actualRelationship.origin.attributes.id)
            .toBe(expectedRacingSessionId)

        expect(actualRelationship.destination.attributes.id)
            .toBe(expectedVideoId)
    })

    test('node exists, but not the relationship', async () => {
        const racingSession = await seedNode(DbNodeType.RacingSession)

        await expect(RacingSession.getHasMainVideoRelationship(racingSession.properties.id))
            .rejects
            .toThrow(RelNotFoundError)
    })

    test('neither node, nor relationship exist', async () => {
        await expect(RacingSession.getHasMainVideoRelationship(-42))
            .rejects
            .toThrow(NodeNotFoundError)
    })
})
