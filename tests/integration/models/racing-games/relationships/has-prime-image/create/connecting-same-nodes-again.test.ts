import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {NodeTypeEnum} from "../../../../../../../src/controllers/nodes/types/NodeTypeEnum"
import {RacingGame} from "../../../../../../../src/models/node-types/racing-games/RacingGame"
import {RelationshipAlreadyExistsError} from "../../../../../../../src/models/types/RelationshipAlreadyExistsError"

test('Trying to create the same ›has-prime-image‹ relationship again', async () => {
    const racingGame = await seedNode(NodeTypeEnum.RACING_GAME)
    const image = await seedNode(NodeTypeEnum.IMAGE)

    await expect(RacingGame.createHasPrimeImageRelationship(racingGame.id, image.id))
        .resolves
        .not.toThrow(RelationshipAlreadyExistsError)

    await expect(RacingGame.createHasPrimeImageRelationship(racingGame.id, image.id))
        .rejects
        .toThrow(RelationshipAlreadyExistsError)
})
