import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../../src/db/types/DbNodeType"
import {RacingGame} from "../../../../../../../../src/models/node-types/racing-games/RacingGame"
import {RelAlreadyExistsError} from "../../../../../../../../src/models/types/RelAlreadyExistsError"

test('Trying to create the same ›has-image‹ relationship again', async () => {
    const racingGame = await seedNode(DbNodeType.RacingGame)
    const image = await seedNode(DbNodeType.Image)

    await expect(RacingGame.createHasImageRelationship(racingGame.properties.id, image.properties.id))
        .resolves
        .not.toThrow(RelAlreadyExistsError)

    await expect(RacingGame.createHasImageRelationship(racingGame.properties.id, image.properties.id))
        .rejects
        .toThrow(RelAlreadyExistsError)
})
