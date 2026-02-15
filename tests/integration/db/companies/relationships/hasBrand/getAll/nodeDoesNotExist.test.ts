import {expect, test} from 'vitest'
import {getRelationshipCollection} from "../../../../../../../src/db/relationships/getRelationshipCollection"
import {DbRelationship} from "../../../../../../../src/db/types/DbRelationship"
import {NodeTypeLabel} from "../../../../../../../src/db/NodeTypeLabel"
import {RelationshipDirection} from "../../../../../../../src/db/types/RelationshipDirection"

test('Expecting an empty list when the Company does not exist', async () => {
    const relationships = await getRelationshipCollection(
        -42,
        DbRelationship.CompanyHasBrand,
        NodeTypeLabel.Brand,
    )

    expect(relationships.length)
        .toBe(0)
})