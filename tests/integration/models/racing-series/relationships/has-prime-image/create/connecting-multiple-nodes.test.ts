import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {seedNodes} from "../../../../../../_toolbox/dbSeeding/seedNodes"
import {NodeTypeEnum} from "../../../../../../../src/controllers/nodes/types/NodeTypeEnum"
import {RacingSeries} from "../../../../../../../src/models/racing-series/RacingSeries"
import {getRelationshipCollection} from "../../../../../../../src/db/relationships/getRelationshipCollection"
import {DbRelationship} from "../../../../../../../src/db/types/DbRelationship"
import {NodeTypeLabel} from "../../../../../../../src/db/NodeTypeLabel"

test('A RACING SERIES cannot have multiple ›has-prime-image‹ relationships', async () => {
    const racingSeries = await seedNode(NodeTypeEnum.RACING_SERIES)
    const imagesAmount = 3
    const images = await seedNodes(NodeTypeEnum.IMAGE, imagesAmount)

    for (const image of images) {
        await RacingSeries.createHasPrimeImageRelationship(racingSeries.id, image.id)
    }

    const relationships = await getRelationshipCollection(
        racingSeries.id,
        DbRelationship.RacingSeriesHasPrimeImage,
        NodeTypeLabel.Image,
    )

    expect(relationships.length)
        .toBe(1)
})
