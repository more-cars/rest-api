import {expect, test} from 'vitest'
import {createRelationship} from "../../../../../../../src/db/relationships/createRelationship"
import {DbRelationship} from "../../../../../../../src/db/types/DbRelationship"
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {NodeTypeEnum} from "../../../../../../../src/controllers/nodes/types/NodeTypeEnum"

test('Creating a "Car Model belongs to Brand" relationship when both nodes exist', async () => {
    const carModel = await seedNode(NodeTypeEnum.CAR_MODEL)
    const brand = await seedNode(NodeTypeEnum.BRAND)

    const createdRelationship = await createRelationship(
        carModel.id,
        brand.id,
        DbRelationship.CarModelBelongsToBrand,
    )

    expect(createdRelationship)
        .toHaveProperty('start_node_id', carModel.id)
    expect(createdRelationship)
        .toHaveProperty('end_node_id', brand.id)
    expect(createdRelationship)
        .toHaveProperty('relationship_id')
    expect(createdRelationship)
        .toHaveProperty('relationship_name', DbRelationship.CarModelBelongsToBrand)
    expect(createdRelationship)
        .toHaveProperty('created_at')
    expect(createdRelationship)
        .toHaveProperty('updated_at')
})

test('Invalid nodes fail the relationship creation', async () => {
    const carModel = await seedNode(NodeTypeEnum.CAR_MODEL)

    const createdRelationship = await createRelationship(
        -42,
        carModel.id,
        DbRelationship.CarModelBelongsToBrand,
    )

    expect(createdRelationship)
        .toEqual(false)
})
