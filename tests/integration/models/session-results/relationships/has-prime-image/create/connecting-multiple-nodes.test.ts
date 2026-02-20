import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {seedNodes} from "../../../../../../_toolbox/dbSeeding/seedNodes"
import {ControllerNodeType} from "../../../../../../../src/controllers/nodes/types/ControllerNodeType"
import {SessionResult} from "../../../../../../../src/models/node-types/session-results/SessionResult"
import {getRelationshipCollection} from "../../../../../../../src/db/relationships/getRelationshipCollection"
import {RelationshipType} from "../../../../../../../src/db/types/RelationshipType"
import {DbNodeType} from "../../../../../../../src/db/types/DbNodeType"

test('A SESSION RESULT cannot have multiple ›has-prime-image‹ relationships', async () => {
    const sessionResult = await seedNode(ControllerNodeType.SESSION_RESULT)
    const imagesAmount = 3
    const images = await seedNodes(ControllerNodeType.IMAGE, imagesAmount)

    for (const image of images) {
        await SessionResult.createHasPrimeImageRelationship(sessionResult.id, image.id)
    }

    const relationships = await getRelationshipCollection(
        sessionResult.id,
        RelationshipType.SessionResultHasPrimeImage,
        DbNodeType.Image,
    )

    expect(relationships.length)
        .toBe(1)
})
