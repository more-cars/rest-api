import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {seedNodes} from "../../../../../../_toolbox/dbSeeding/seedNodes"
import {NodeTypeEnum} from "../../../../../../../src/controllers/nodes/types/NodeTypeEnum"
import {RacingSession} from "../../../../../../../src/models/racing-sessions/RacingSession"
import {getRelationshipCollection} from "../../../../../../../src/db/relationships/getRelationshipCollection"
import {DbRelationship} from "../../../../../../../src/db/types/DbRelationship"

test('A RACING SESSION cannot have multiple ›has-prime-image‹ relationships', async () => {
    const racingSession = await seedNode(NodeTypeEnum.RACING_SESSION)
    const imagesAmount = 3
    const images = await seedNodes(NodeTypeEnum.IMAGE, imagesAmount)

    for (const image of images) {
        await RacingSession.createHasPrimeImageRelationship(racingSession.id, image.id)
    }

    const relationships = await getRelationshipCollection(racingSession.id, DbRelationship.RacingSessionHasPrimeImage)

    expect(relationships.length)
        .toBe(1)
})
