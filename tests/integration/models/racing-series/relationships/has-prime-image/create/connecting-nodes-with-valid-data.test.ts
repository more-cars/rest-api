import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {ControllerNodeType} from "../../../../../../../src/controllers/nodes/types/ControllerNodeType"
import {RacingSeries} from "../../../../../../../src/models/node-types/racing-series/RacingSeries"
import {RelType} from "../../../../../../../src/models/relationships/types/RelType"

test('Creating a ›has-prime-image‹ relationship with valid data', async () => {
    const racingSeries = await seedNode(ControllerNodeType.RACING_SERIES)
    const image = await seedNode(ControllerNodeType.IMAGE)

    const createdRelationship = await RacingSeries.createHasPrimeImageRelationship(racingSeries.properties.id, image.properties.id)

    expect(createdRelationship.origin.properties.id)
        .toEqual(racingSeries.properties.id)
    expect(createdRelationship.destination.properties.id)
        .toEqual(image.properties.id)
    expect(createdRelationship.id)
        .toBeDefined()
    expect(createdRelationship.type)
        .toEqual(RelType.RacingSeriesHasPrimeImage)
    expect(createdRelationship.created_at)
        .toBeDefined()
    expect(createdRelationship.updated_at)
        .toBeDefined()
})
