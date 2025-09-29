import {expect, test} from 'vitest'
import {seedRelationship} from "../../../../../../_toolbox/dbSeeding/seedRelationship"
import {
    getRelationshipsForSpecificNode
} from "../../../../../../../src/db/relationships/getRelationshipsForSpecificNode"
import {DbRelationship} from "../../../../../../../src/db/types/DbRelationship"

test('Node and relationship exist', async () => {
    const relationship = await seedRelationship('company', 'image', DbRelationship.CompanyHasPrimeImage)

    const relationships = await getRelationshipsForSpecificNode(
        relationship.start_node_id,
        DbRelationship.CompanyHasPrimeImage,
    )

    expect(relationships.length)
        .toBe(1)
})