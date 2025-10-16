import {describe, expect, test} from 'vitest'
import assert from "assert"
import {seedRelationship} from "../../../../_toolbox/dbSeeding/seedRelationship"
import {DbRelationship} from "../../../../../src/db/types/DbRelationship"
import {getRelationshipById} from "../../../../../src/db/relationships/getRelationshipById"

describe('Requesting a relationship', () => {
    test('relationship exists', async () => {
        const expectedRelationship = await seedRelationship('brand', 'car model', DbRelationship.BrandHasCarModel)
        const actualRelationship = await getRelationshipById(expectedRelationship.relationship_id)

        if (!actualRelationship) {
            assert.fail('Could not fetch relationship')
        } else {
            expect(actualRelationship.start_node_id)
                .toBe(expectedRelationship.start_node_id)

            expect(actualRelationship.end_node_id)
                .toBe(expectedRelationship.end_node_id)
        }
    })

    test('relationship does not exist', async () => {
        const relationship = await getRelationshipById(-42)

        expect(relationship)
            .toBeFalsy()
    })
})
