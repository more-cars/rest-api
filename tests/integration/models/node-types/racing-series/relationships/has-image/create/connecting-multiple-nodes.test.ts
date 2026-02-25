import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../../src/db/types/DbNodeType"
import {seedNodes} from "../../../../../../../_toolbox/dbSeeding/seedNodes"
import {RacingSeries} from "../../../../../../../../src/models/node-types/racing-series/RacingSeries"
import {getRelationshipCollection} from "../../../../../../../../src/db/relationships/getRelationshipCollection"
import {RelationshipType} from "../../../../../../../../src/db/types/RelationshipType"

test('A RACING SERIES can have multiple ›has-image‹ relationships', async () => {
    const racingSeries = await seedNode(DbNodeType.RacingSeries)
    const imagesAmount = 3
    const images = await seedNodes(DbNodeType.Image, imagesAmount)

    for (const image of images) {
        await RacingSeries.createHasImageRelationship(racingSeries.properties.id, image.properties.id)
    }

    const relationships = await getRelationshipCollection(
        racingSeries.properties.id,
        RelationshipType.RacingSeriesHasImage,
        DbNodeType.Image,
    )

    expect(relationships.length)
        .toBe(imagesAmount)
})
