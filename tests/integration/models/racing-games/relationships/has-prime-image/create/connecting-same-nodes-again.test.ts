import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {ControllerNodeType} from "../../../../../../../src/controllers/nodes/types/ControllerNodeType"
import {RacingGame} from "../../../../../../../src/models/node-types/racing-games/RacingGame"
import {RelAlreadyExistsError} from "../../../../../../../src/models/types/RelAlreadyExistsError"

test('Trying to create the same ›has-prime-image‹ relationship again', async () => {
    const racingGame = await seedNode(ControllerNodeType.RACING_GAME)
    const image = await seedNode(ControllerNodeType.IMAGE)

    await expect(RacingGame.createHasPrimeImageRelationship(racingGame.id, image.id))
        .resolves
        .not.toThrow(RelAlreadyExistsError)

    await expect(RacingGame.createHasPrimeImageRelationship(racingGame.id, image.id))
        .rejects
        .toThrow(RelAlreadyExistsError)
})
