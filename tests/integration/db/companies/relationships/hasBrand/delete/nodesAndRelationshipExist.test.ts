import {expect, test} from 'vitest'
import {seedRelationship} from "../../../../../../_toolbox/dbSeeding/seedRelationship"
import {deleteSpecificRelationship} from "../../../../../../../src/db/relationships/deleteSpecificRelationship"
import {getSpecificRelationship} from "../../../../../../../src/db/relationships/getSpecificRelationship"
import {DbRelationship} from "../../../../../../../src/db/types/DbRelationship"

test('Both nodes and the relationship exist', async () => {
    const seededRelationship = await seedRelationship('company', 'brand', DbRelationship.CompanyHasBrand)

    const relationshipBefore = await getSpecificRelationship(
        seededRelationship.start_node_id,
        seededRelationship.end_node_id,
        DbRelationship.CompanyHasBrand,
    )

    expect(relationshipBefore)
        .toBeTruthy()

    await deleteSpecificRelationship(
        seededRelationship.start_node_id,
        seededRelationship.end_node_id,
        DbRelationship.CompanyHasBrand,
    )

    const relationshipAfter = await getSpecificRelationship(
        seededRelationship.start_node_id,
        seededRelationship.end_node_id,
        DbRelationship.CompanyHasBrand,
    )

    expect(relationshipAfter)
        .toBeFalsy()
})