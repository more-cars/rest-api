import {seedRelationships} from "../../../../dbSeeding/brands/relationships/seedRelationships"
import {removeDuplicates} from "../../../../_helpers/removeDuplicates"

test('Each relationship is created with a different ID', async () => {
    const relationships = await seedRelationships(20)

    const extractedIds = relationships.map(relationship => relationship.relationship_id)
    const deduplicatedIds = removeDuplicates(extractedIds)

    expect(extractedIds.length)
        .toBe(deduplicatedIds.length)
})
