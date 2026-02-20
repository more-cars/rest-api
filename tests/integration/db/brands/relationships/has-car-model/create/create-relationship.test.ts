import {describe, expect, test} from 'vitest'
import {createRelationship} from "../../../../../../../src/db/relationships/createRelationship"
import {RelationshipType} from "../../../../../../../src/db/types/RelationshipType"
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {ControllerNodeType} from "../../../../../../../src/controllers/nodes/types/ControllerNodeType"

describe('Creating a ›has-car-model‹ relationship', () => {
    test('with valid data', async () => {
        const brand = await seedNode(ControllerNodeType.BRAND)
        const carModel = await seedNode(ControllerNodeType.CAR_MODEL)

        const createdRelationship = await createRelationship(
            brand.id,
            carModel.id,
            RelationshipType.BrandHasCarModel,
        )

        expect(createdRelationship)
            .toHaveProperty('start_node.id', brand.id)
        expect(createdRelationship)
            .toHaveProperty('end_node.id', carModel.id)
        expect(createdRelationship)
            .toHaveProperty('id')
        expect(createdRelationship)
            .toHaveProperty('type', RelationshipType.BrandHasCarModel)
        expect(createdRelationship)
            .toHaveProperty('created_at')
        expect(createdRelationship)
            .toHaveProperty('updated_at')
    })

    test('with invalid data', async () => {
        const brand = await seedNode(ControllerNodeType.BRAND)

        const createdRelationship = await createRelationship(
            brand.id,
            -42,
            RelationshipType.BrandHasCarModel,
        )

        expect(createdRelationship)
            .toEqual(false)
    })
})
