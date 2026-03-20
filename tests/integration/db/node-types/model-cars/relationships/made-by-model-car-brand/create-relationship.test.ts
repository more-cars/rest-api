import {describe, expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../src/db/types/DbNodeType"
import {createRelationship} from "../../../../../../../src/db/relationships/createRelationship"
import {RelationshipType} from "../../../../../../../src/db/types/RelationshipType"

describe('Creating a ›made-by-model-car-brand‹ relationship', () => {
    test('with valid data', async () => {
        const modelCar = await seedNode(DbNodeType.ModelCar)
        const modelCarBrand = await seedNode(DbNodeType.ModelCarBrand)

        const createdRelationship = await createRelationship(
            modelCar.properties.id,
            modelCarBrand.properties.id,
            RelationshipType.ModelCarMadeByModelCarBrand,
        )

        expect(createdRelationship)
            .toHaveProperty('id')
        expect(createdRelationship)
            .toHaveProperty('type', RelationshipType.ModelCarMadeByModelCarBrand)
        expect(createdRelationship)
            .toHaveProperty('start_node.properties.id', modelCar.properties.id)
        expect(createdRelationship)
            .toHaveProperty('end_node.properties.id', modelCarBrand.properties.id)
        expect(createdRelationship)
            .toHaveProperty('created_at')
        expect(createdRelationship)
            .toHaveProperty('updated_at')
    })

    test('with invalid data', async () => {
        const modelCar = await seedNode(DbNodeType.ModelCar)

        const createdRelationship = await createRelationship(
            modelCar.properties.id,
            -42,
            RelationshipType.ModelCarMadeByModelCarBrand,
        )

        expect(createdRelationship)
            .toEqual(false)
    })
})
