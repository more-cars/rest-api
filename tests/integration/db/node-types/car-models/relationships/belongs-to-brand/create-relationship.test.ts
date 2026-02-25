import {describe, expect, test} from 'vitest'
import {createRelationship} from "../../../../../../../src/db/relationships/createRelationship"
import {RelationshipType} from "../../../../../../../src/db/types/RelationshipType"
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../src/db/types/DbNodeType"

describe('Creating a ›belongs-to-brand‹ relationship', () => {
    test('with valid data', async () => {
        const carModel = await seedNode(DbNodeType.CarModel)
        const brand = await seedNode(DbNodeType.Brand)

        const createdRelationship = await createRelationship(
            carModel.properties.id,
            brand.properties.id,
            RelationshipType.CarModelBelongsToBrand,
        )

        expect(createdRelationship)
            .toHaveProperty('start_node.properties.id', carModel.properties.id)
        expect(createdRelationship)
            .toHaveProperty('end_node.properties.id', brand.properties.id)
        expect(createdRelationship)
            .toHaveProperty('id')
        expect(createdRelationship)
            .toHaveProperty('type', RelationshipType.CarModelBelongsToBrand)
        expect(createdRelationship)
            .toHaveProperty('created_at')
        expect(createdRelationship)
            .toHaveProperty('updated_at')
    })

    test('with invalid data', async () => {
        const carModel = await seedNode(DbNodeType.CarModel)

        const createdRelationship = await createRelationship(
            carModel.properties.id,
            -42,
            RelationshipType.CarModelBelongsToBrand,
        )

        expect(createdRelationship)
            .toEqual(false)
    })
})
