import {expect, test} from 'vitest'
import {seedRelationship} from "../../../../../../_toolbox/dbSeeding/seedRelationship"
import {Company} from "../../../../../../../src/models/companies/Company"
import {DbRelationship} from "../../../../../../../src/db/types/DbRelationship"
import {getSpecificRelationship} from "../../../../../../../src/db/relationships/getSpecificRelationship"

test('Both nodes and the relationship exist', async () => {
    const seededRelationship = await seedRelationship('company', 'image', DbRelationship.CompanyHasImage)

    const relationshipBefore = await getSpecificRelationship(
        seededRelationship.start_node_id,
        seededRelationship.end_node_id,
        DbRelationship.CompanyHasImage,
    )

    expect(relationshipBefore)
        .toBeTruthy()

    await Company.deleteHasImageRelationship(seededRelationship.start_node_id, seededRelationship.end_node_id)

    const relationshipAfter = await getSpecificRelationship(
        seededRelationship.start_node_id,
        seededRelationship.end_node_id,
        DbRelationship.CompanyHasImage,
    )

    expect(relationshipAfter)
        .toBeFalsy()
})
