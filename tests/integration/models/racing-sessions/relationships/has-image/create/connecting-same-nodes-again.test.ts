import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {ControllerNodeType} from "../../../../../../../src/controllers/nodes/types/ControllerNodeType"
import {RacingSession} from "../../../../../../../src/models/node-types/racing-sessions/RacingSession"
import {RelAlreadyExistsError} from "../../../../../../../src/models/types/RelAlreadyExistsError"

test('Trying to create the same ›has-image‹ relationship again', async () => {
    const racingSession = await seedNode(ControllerNodeType.RACING_SESSION)
    const image = await seedNode(ControllerNodeType.IMAGE)

    await expect(RacingSession.createHasImageRelationship(racingSession.id, image.id))
        .resolves
        .not.toThrow(RelAlreadyExistsError)

    await expect(RacingSession.createHasImageRelationship(racingSession.id, image.id))
        .rejects
        .toThrow(RelAlreadyExistsError)
})
