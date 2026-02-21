import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {seedNodes} from "../../../../../../_toolbox/dbSeeding/seedNodes"
import {ControllerNodeType} from "../../../../../../../src/controllers/nodes/types/ControllerNodeType"
import {RacingSeries} from "../../../../../../../src/models/node-types/racing-series/RacingSeries"
import {getRelationshipCollection} from "../../../../../../../src/db/relationships/getRelationshipCollection"
import {RelationshipType} from "../../../../../../../src/db/types/RelationshipType"
import {DbNodeType} from "../../../../../../../src/db/types/DbNodeType"

test('A RACING SERIES cannot have multiple ›has-prime-image‹ relationships', async () => {
    const racingSeries = await seedNode(ControllerNodeType.RacingSeries)
    const imagesAmount = 3
    const images = await seedNodes(ControllerNodeType.Image, imagesAmount)

    for (const image of images) {
        await RacingSeries.createHasPrimeImageRelationship(racingSeries.properties.id, image.properties.id)
    }

    const relationships = await getRelationshipCollection(
        racingSeries.properties.id,
        RelationshipType.RacingSeriesHasPrimeImage,
        DbNodeType.Image,
    )

    expect(relationships.length)
        .toBe(1)
})
