import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {ControllerNodeType} from "../../../../../../../src/controllers/nodes/types/ControllerNodeType"
import {RacingSession} from "../../../../../../../src/models/node-types/racing-sessions/RacingSession"
import {NodeNotFoundError} from "../../../../../../../src/models/types/NodeNotFoundError"

test('Trying to create a ›has-image‹ relationship with nodes that do not exist', async () => {
    const racingSession = await seedNode(ControllerNodeType.RacingSession)
    const image = await seedNode(ControllerNodeType.Image)

    await expect(RacingSession.createHasImageRelationship(-42, image.properties.id))
        .rejects
        .toThrow(NodeNotFoundError)

    await expect(RacingSession.createHasImageRelationship(racingSession.properties.id, -43))
        .rejects
        .toThrow(NodeNotFoundError)

    await expect(RacingSession.createHasImageRelationship(-44, -45))
        .rejects
        .toThrow(NodeNotFoundError)
})
