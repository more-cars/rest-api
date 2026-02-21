import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {ControllerNodeType} from "../../../../../../../src/controllers/nodes/types/ControllerNodeType"
import {RacingSeries} from "../../../../../../../src/models/node-types/racing-series/RacingSeries"
import {RelType} from "../../../../../../../src/models/relationships/types/RelType"

test('Creating a ›has-image‹ relationship with valid data', async () => {
    const racingSeries = await seedNode(ControllerNodeType.RACING_SERIES)
    const image = await seedNode(ControllerNodeType.IMAGE)

    const createdRelationship = await RacingSeries.createHasImageRelationship(racingSeries.properties.id, image.properties.id)

    expect(createdRelationship.origin.attributes.id)
        .toEqual(racingSeries.properties.id)
    expect(createdRelationship.destination.attributes.id)
        .toEqual(image.properties.id)
    expect(createdRelationship.id)
        .toBeDefined()
    expect(createdRelationship.type)
        .toEqual(RelType.RacingSeriesHasImage)
    expect(createdRelationship.created_at)
        .toBeDefined()
    expect(createdRelationship.updated_at)
        .toBeDefined()
})
