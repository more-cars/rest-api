import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {seedNodes} from "../../../../../../_toolbox/dbSeeding/seedNodes"
import {NodeTypeEnum} from "../../../../../../../src/controllers/nodes/types/NodeTypeEnum"
import {RacingSeries} from "../../../../../../../src/models/racing-series/RacingSeries"
import {getRelationshipsForSpecificNode} from "../../../../../../../src/db/relationships/getRelationshipsForSpecificNode"
import {DbRelationship} from "../../../../../../../src/db/types/DbRelationship"

test('A RACING SERIES can have multiple ›has-image‹ relationships', async () => {
    const racingSeries = await seedNode(NodeTypeEnum.RACING_SERIES)
    const imagesAmount = 3
    const images = await seedNodes(NodeTypeEnum.IMAGE, imagesAmount)

    for (const image of images) {
        await RacingSeries.createHasImageRelationship(racingSeries.id, image.id)
    }

    const relationships = await getRelationshipsForSpecificNode(racingSeries.id, DbRelationship.RacingSeriesHasImage)

    expect(relationships.length)
        .toBe(imagesAmount)
})
