import {describe, expect, test} from 'vitest'
import {createRelationship} from "../../../../../../../src/db/relationships/createRelationship"
import {RelationshipType} from "../../../../../../../src/db/types/RelationshipType"
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../src/db/types/DbNodeType"

describe('Creating a ›achieved-with-car-model-variant‹ relationship', () => {
    test('with valid data', async () => {
        const lapTime = await seedNode(DbNodeType.LapTime)
        const carModelVariant = await seedNode(DbNodeType.CarModelVariant)

        const createdRelationship = await createRelationship(
            lapTime.properties.id,
            carModelVariant.properties.id,
            RelationshipType.LapTimeAchievedWithCarModelVariant,
        )

        expect(createdRelationship)
            .toHaveProperty('start_node.properties.id', lapTime.properties.id)
        expect(createdRelationship)
            .toHaveProperty('end_node.properties.id', carModelVariant.properties.id)
        expect(createdRelationship)
            .toHaveProperty('id')
        expect(createdRelationship)
            .toHaveProperty('type', RelationshipType.LapTimeAchievedWithCarModelVariant)
        expect(createdRelationship)
            .toHaveProperty('created_at')
        expect(createdRelationship)
            .toHaveProperty('updated_at')
    })

    test('with invalid data', async () => {
        const lapTime = await seedNode(DbNodeType.LapTime)

        const createdRelationship = await createRelationship(
            lapTime.properties.id,
            -42,
            RelationshipType.LapTimeAchievedWithCarModelVariant,
        )

        expect(createdRelationship)
            .toEqual(false)
    })
})
