import {expect, test} from 'vitest'
import {createRelationship} from "../../../../../../../src/db/relationships/createRelationship"
import {DbRelationship} from "../../../../../../../src/db/types/DbRelationship"
import {seedCarModel} from "../../../../../../_toolbox/dbSeeding/car-models/nodes/seedCarModel"
import {seedImage} from "../../../../../../_toolbox/dbSeeding/images/nodes/seedImage"
import {CarModelRelationship} from "../../../../../../../src/models/car-models/types/CarModelRelationship"

test('Creating the relationship when both nodes exist', async () => {
    const carModel = await seedCarModel()
    const image = await seedImage()

    const createdRelationship = await createRelationship(
        carModel.id,
        image.id,
        DbRelationship.CarModelHasPrimeImage,
    )

    expect(createdRelationship)
        .toHaveProperty('start_node_id', carModel.id)
    expect(createdRelationship)
        .toHaveProperty('end_node_id', image.id)
    expect(createdRelationship)
        .toHaveProperty('relationship_id')
    expect(createdRelationship)
        .toHaveProperty('relationship_name', CarModelRelationship.hasPrimeImage)
    expect(createdRelationship)
        .toHaveProperty('created_at')
    expect(createdRelationship)
        .toHaveProperty('updated_at')
})

test('Invalid nodes fail the relationship creation', async () => {
    const carModel = await seedCarModel()

    const createdRelationship = await createRelationship(
        carModel.id,
        -42,
        DbRelationship.CarModelHasPrimeImage,
    )

    expect(createdRelationship)
        .toEqual(false)
})
