import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {ControllerNodeType} from "../../../../../../../src/controllers/nodes/types/ControllerNodeType"
import {SessionResult} from "../../../../../../../src/models/node-types/session-results/SessionResult"
import {RelAlreadyExistsError} from "../../../../../../../src/models/types/RelAlreadyExistsError"

test('Trying to create the same ›has-prime-image‹ relationship again', async () => {
    const sessionResult = await seedNode(ControllerNodeType.SessionResult)
    const image = await seedNode(ControllerNodeType.Image)

    await expect(SessionResult.createHasPrimeImageRelationship(sessionResult.properties.id, image.properties.id))
        .resolves
        .not.toThrow(RelAlreadyExistsError)

    await expect(SessionResult.createHasPrimeImageRelationship(sessionResult.properties.id, image.properties.id))
        .rejects
        .toThrow(RelAlreadyExistsError)
})
