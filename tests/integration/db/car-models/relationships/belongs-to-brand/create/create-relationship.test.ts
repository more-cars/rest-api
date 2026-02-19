import {describe, expect, test} from 'vitest'
import {createRelationship} from "../../../../../../../src/db/relationships/createRelationship"
import {RelationshipType} from "../../../../../../../src/db/types/RelationshipType"
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {NodeTypeEnum} from "../../../../../../../src/controllers/nodes/types/NodeTypeEnum"

describe('Creating a ›belongs-to-brand‹ relationship', () => {
    test('with valid data', async () => {
        const carModel = await seedNode(NodeTypeEnum.CAR_MODEL)
        const brand = await seedNode(NodeTypeEnum.BRAND)

        const createdRelationship = await createRelationship(
            carModel.id,
            brand.id,
            RelationshipType.CarModelBelongsToBrand,
        )

        expect(createdRelationship)
            .toHaveProperty('start_node_id', carModel.id)
        expect(createdRelationship)
            .toHaveProperty('end_node_id', brand.id)
        expect(createdRelationship)
            .toHaveProperty('id')
        expect(createdRelationship)
            .toHaveProperty('relationship_name', RelationshipType.CarModelBelongsToBrand)
        expect(createdRelationship)
            .toHaveProperty('created_at')
        expect(createdRelationship)
            .toHaveProperty('updated_at')
    })

    test('with invalid data', async () => {
        const carModel = await seedNode(NodeTypeEnum.CAR_MODEL)

        const createdRelationship = await createRelationship(
            carModel.id,
            -42,
            RelationshipType.CarModelBelongsToBrand,
        )

        expect(createdRelationship)
            .toEqual(false)
    })
})
