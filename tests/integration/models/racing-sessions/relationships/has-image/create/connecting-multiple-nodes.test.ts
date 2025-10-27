import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {seedNodes} from "../../../../../../_toolbox/dbSeeding/seedNodes"
import {NodeTypeEnum} from "../../../../../../../src/controllers/nodes/types/NodeTypeEnum"
import {RacingSession} from "../../../../../../../src/models/racing-sessions/RacingSession"
import {getRelationshipsForSpecificNode} from "../../../../../../../src/db/relationships/getRelationshipsForSpecificNode"
import {DbRelationship} from "../../../../../../../src/db/types/DbRelationship"

test('A RACING SESSION can have multiple ›has-image‹ relationships', async () => {
    const racingSession = await seedNode(NodeTypeEnum.RACING_SESSION)
    const imagesAmount = 3
    const images = await seedNodes(NodeTypeEnum.IMAGE, imagesAmount)

    for (const image of images) {
        await RacingSession.createHasImageRelationship(racingSession.id, image.id)
    }

    const relationships = await getRelationshipsForSpecificNode(racingSession.id, DbRelationship.RacingSessionHasImage)

    expect(relationships.length)
        .toBe(imagesAmount)
})
