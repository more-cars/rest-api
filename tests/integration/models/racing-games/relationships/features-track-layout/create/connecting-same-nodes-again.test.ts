import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {ControllerNodeType} from "../../../../../../../src/controllers/nodes/types/ControllerNodeType"
import {RacingGame} from "../../../../../../../src/models/node-types/racing-games/RacingGame"
import {RelAlreadyExistsError} from "../../../../../../../src/models/types/RelAlreadyExistsError"

test('Trying to create the same ›features-track-layout‹ relationship again', async () => {
    const racingGame = await seedNode(ControllerNodeType.RACING_GAME)
    const trackLayout = await seedNode(ControllerNodeType.TRACK_LAYOUT)

    await expect(RacingGame.createFeaturesTrackLayoutRelationship(racingGame.properties.id, trackLayout.properties.id))
        .resolves
        .not.toThrow(RelAlreadyExistsError)

    await expect(RacingGame.createFeaturesTrackLayoutRelationship(racingGame.properties.id, trackLayout.properties.id))
        .rejects
        .toThrow(RelAlreadyExistsError)
})
