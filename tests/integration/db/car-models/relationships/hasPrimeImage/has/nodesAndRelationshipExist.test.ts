import {expect, test} from 'vitest'
import {seedRelationship} from "../../../../../../_toolbox/dbSeeding/seedRelationship"
import {getSpecificRelationship} from "../../../../../../../src/db/relationships/getSpecificRelationship"
import {DbRelationship} from "../../../../../../../src/db/types/DbRelationship"

test('Both nodes and the relationship exist', async () => {
    const expectedRelationship = await seedRelationship('car model', 'image', DbRelationship.CarModelHasPrimeImage)

    const actualRelationship = await getSpecificRelationship(
        expectedRelationship.start_node_id,
        expectedRelationship.end_node_id,
        DbRelationship.CarModelHasPrimeImage,
    )

    expect(actualRelationship)
        .toEqual(expectedRelationship)
})