import {describe, expect, test} from 'vitest'
import {createRelationship} from "../../../../../../../src/db/relationships/createRelationship"
import {RelationshipType} from "../../../../../../../src/db/types/RelationshipType"
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../src/db/types/DbNodeType"

describe('Creating a ›achieved-lap-time‹ relationship', () => {
    test('with valid data', async () => {
        const carModelVariant = await seedNode(DbNodeType.CarModelVariant)
        const lapTime = await seedNode(DbNodeType.LapTime)

        const createdRelationship = await createRelationship(
            carModelVariant.properties.id,
            lapTime.properties.id,
            RelationshipType.CarModelVariantAchievedLapTime,
        )

        expect(createdRelationship)
            .toHaveProperty('start_node.properties.id', carModelVariant.properties.id)
        expect(createdRelationship)
            .toHaveProperty('end_node.properties.id', lapTime.properties.id)
        expect(createdRelationship)
            .toHaveProperty('id')
        expect(createdRelationship)
            .toHaveProperty('type', RelationshipType.CarModelVariantAchievedLapTime)
        expect(createdRelationship)
            .toHaveProperty('created_at')
        expect(createdRelationship)
            .toHaveProperty('updated_at')
    })

    test('with invalid data', async () => {
        const carModelVariant = await seedNode(DbNodeType.CarModelVariant)

        const createdRelationship = await createRelationship(
            carModelVariant.properties.id,
            -42,
            RelationshipType.CarModelVariantAchievedLapTime,
        )

        expect(createdRelationship)
            .toEqual(false)
    })
})
