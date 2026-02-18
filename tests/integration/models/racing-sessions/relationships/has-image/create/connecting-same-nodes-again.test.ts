import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {NodeTypeEnum} from "../../../../../../../src/controllers/nodes/types/NodeTypeEnum"
import {RacingSession} from "../../../../../../../src/models/node-types/racing-sessions/RacingSession"
import {RelationshipAlreadyExistsError} from "../../../../../../../src/models/types/RelationshipAlreadyExistsError"

test('Trying to create the same ›has-image‹ relationship again', async () => {
    const racingSession = await seedNode(NodeTypeEnum.RACING_SESSION)
    const image = await seedNode(NodeTypeEnum.IMAGE)

    await expect(RacingSession.createHasImageRelationship(racingSession.id, image.id))
        .resolves
        .not.toThrow(RelationshipAlreadyExistsError)

    await expect(RacingSession.createHasImageRelationship(racingSession.id, image.id))
        .rejects
        .toThrow(RelationshipAlreadyExistsError)
})
