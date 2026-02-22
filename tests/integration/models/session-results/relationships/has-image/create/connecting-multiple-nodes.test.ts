import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../src/db/types/DbNodeType"
import {seedNodes} from "../../../../../../_toolbox/dbSeeding/seedNodes"
import {SessionResult} from "../../../../../../../src/models/node-types/session-results/SessionResult"
import {getRelationshipCollection} from "../../../../../../../src/db/relationships/getRelationshipCollection"
import {RelationshipType} from "../../../../../../../src/db/types/RelationshipType"

test('A SESSION RESULT can have multiple ›has-image‹ relationships', async () => {
    const sessionResult = await seedNode(DbNodeType.SessionResult)
    const imagesAmount = 3
    const images = await seedNodes(DbNodeType.Image, imagesAmount)

    for (const image of images) {
        await SessionResult.createHasImageRelationship(sessionResult.properties.id, image.properties.id)
    }

    const relationships = await getRelationshipCollection(
        sessionResult.properties.id,
        RelationshipType.SessionResultHasImage,
        DbNodeType.Image,
    )

    expect(relationships.length)
        .toBe(imagesAmount)
})
