import {expect, test} from 'vitest'
import {seedRelationships} from "../../../../_toolbox/dbSeeding/brands/relationships/seedRelationships"
import {removeDuplicates} from "../../../../_toolbox/removeDuplicates"

test('Each relationship is created with a different ID', async () => {
    const relationships = await seedRelationships(10)

    const extractedIds = relationships.map(relationship => relationship.id)
    const deduplicatedIds = removeDuplicates(extractedIds)

    expect(extractedIds.length)
        .toBe(deduplicatedIds.length)
})
