import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../src/db/types/DbNodeType"
import {CarModelVariant} from "../../../../../../../src/models/node-types/car-model-variants/CarModelVariant"
import {RelType} from "../../../../../../../src/models/relationships/types/RelType"

test('Creating a ›achieved-lap-time‹ relationship with valid data', async () => {
    const carModelVariant = await seedNode(DbNodeType.CarModelVariant)
    const lapTime = await seedNode(DbNodeType.LapTime)

    const createdRelationship = await CarModelVariant.createAchievedLapTimeRelationship(carModelVariant.properties.id, lapTime.properties.id)

    expect(createdRelationship.origin.attributes.id)
        .toEqual(carModelVariant.properties.id)
    expect(createdRelationship.destination.attributes.id)
        .toEqual(lapTime.properties.id)
    expect(createdRelationship.id)
        .toBeDefined()
    expect(createdRelationship.type)
        .toEqual(RelType.CarModelVariantAchievedLapTime)
    expect(createdRelationship.created_at)
        .toBeDefined()
    expect(createdRelationship.updated_at)
        .toBeDefined()
})
