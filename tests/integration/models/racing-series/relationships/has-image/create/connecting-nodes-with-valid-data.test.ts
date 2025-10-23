import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {NodeTypeEnum} from "../../../../../../../src/controllers/nodes/types/NodeTypeEnum"
import {RacingSeries} from "../../../../../../../src/models/racing-series/RacingSeries"
import {RacingSeriesRelationship} from "../../../../../../../src/models/racing-series/types/RacingSeriesRelationship"

test('Creating a ›has-image‹ relationship with valid data', async () => {
    const racingSeries = await seedNode(NodeTypeEnum.RACING_SERIES)
    const image = await seedNode(NodeTypeEnum.IMAGE)

    const createdRelationship = await RacingSeries.createHasImageRelationship(racingSeries.id, image.id)

    expect(createdRelationship.origin.id)
        .toEqual(racingSeries.id)
    expect(createdRelationship.destination.id)
        .toEqual(image.id)
    expect(createdRelationship.id)
        .toBeDefined()
    expect(createdRelationship.type)
        .toEqual(RacingSeriesRelationship.hasImage)
    expect(createdRelationship.created_at)
        .toBeDefined()
    expect(createdRelationship.updated_at)
        .toBeDefined()
})
