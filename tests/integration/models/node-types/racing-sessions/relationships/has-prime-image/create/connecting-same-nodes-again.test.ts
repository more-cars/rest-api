import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../../src/db/types/DbNodeType"
import {RacingSession} from "../../../../../../../../src/models/node-types/racing-sessions/RacingSession"
import {RelAlreadyExistsError} from "../../../../../../../../src/models/types/RelAlreadyExistsError"

test('Trying to create the same ›has-prime-image‹ relationship again', async () => {
    const racingSession = await seedNode(DbNodeType.RacingSession)
    const image = await seedNode(DbNodeType.Image)

    await expect(RacingSession.createHasPrimeImageRelationship(racingSession.properties.id, image.properties.id))
        .resolves
        .not.toThrow(RelAlreadyExistsError)

    await expect(RacingSession.createHasPrimeImageRelationship(racingSession.properties.id, image.properties.id))
        .rejects
        .toThrow(RelAlreadyExistsError)
})
