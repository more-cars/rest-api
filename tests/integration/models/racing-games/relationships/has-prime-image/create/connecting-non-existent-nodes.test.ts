import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {NodeTypeEnum} from "../../../../../../../src/controllers/nodes/types/NodeTypeEnum"
import {RacingGame} from "../../../../../../../src/models/racing-games/RacingGame"
import {NodeNotFoundError} from "../../../../../../../src/models/types/NodeNotFoundError"

test('Trying to create a ›has-prime-image‹ relationship with nodes that do not exist', async () => {
    const racingGame = await seedNode(NodeTypeEnum.RACING_GAME)
    const image = await seedNode(NodeTypeEnum.IMAGE)

    await expect(RacingGame.createHasPrimeImageRelationship(-42, image.id))
        .rejects
        .toThrow(NodeNotFoundError)

    await expect(RacingGame.createHasPrimeImageRelationship(racingGame.id, -43))
        .rejects
        .toThrow(NodeNotFoundError)

    await expect(RacingGame.createHasPrimeImageRelationship(-44, -45))
        .rejects
        .toThrow(NodeNotFoundError)
})
