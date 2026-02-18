import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {NodeTypeEnum} from "../../../../../../../src/controllers/nodes/types/NodeTypeEnum"
import {RacingSeries} from "../../../../../../../src/models/racing-series/RacingSeries"
import {RelType} from "../../../../../../../src/models/relationships/types/RelType"

test('Creating a ›has-prime-image‹ relationship with valid data', async () => {
    const racingSeries = await seedNode(NodeTypeEnum.RACING_SERIES)
    const image = await seedNode(NodeTypeEnum.IMAGE)

    const createdRelationship = await RacingSeries.createHasPrimeImageRelationship(racingSeries.id, image.id)

    expect(createdRelationship.origin.id)
        .toEqual(racingSeries.id)
    expect(createdRelationship.destination.id)
        .toEqual(image.id)
    expect(createdRelationship.id)
        .toBeDefined()
    expect(createdRelationship.type)
        .toEqual(RelType.RacingSeriesHasPrimeImage)
    expect(createdRelationship.created_at)
        .toBeDefined()
    expect(createdRelationship.updated_at)
        .toBeDefined()
})
