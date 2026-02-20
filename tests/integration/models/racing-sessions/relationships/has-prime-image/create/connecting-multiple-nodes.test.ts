import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {seedNodes} from "../../../../../../_toolbox/dbSeeding/seedNodes"
import {ControllerNodeType} from "../../../../../../../src/controllers/nodes/types/ControllerNodeType"
import {RacingSession} from "../../../../../../../src/models/node-types/racing-sessions/RacingSession"
import {getRelationshipCollection} from "../../../../../../../src/db/relationships/getRelationshipCollection"
import {RelationshipType} from "../../../../../../../src/db/types/RelationshipType"
import {DbNodeType} from "../../../../../../../src/db/types/DbNodeType"

test('A RACING SESSION cannot have multiple ›has-prime-image‹ relationships', async () => {
    const racingSession = await seedNode(ControllerNodeType.RACING_SESSION)
    const imagesAmount = 3
    const images = await seedNodes(ControllerNodeType.IMAGE, imagesAmount)

    for (const image of images) {
        await RacingSession.createHasPrimeImageRelationship(racingSession.id, image.id)
    }

    const relationships = await getRelationshipCollection(
        racingSession.id,
        RelationshipType.RacingSessionHasPrimeImage,
        DbNodeType.Image,
    )

    expect(relationships.length)
        .toBe(1)
})
