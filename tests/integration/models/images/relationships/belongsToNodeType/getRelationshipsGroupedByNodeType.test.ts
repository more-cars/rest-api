import {expect, test} from 'vitest'
import {seedImage} from "../../../../../_toolbox/dbSeeding/images/nodes/seedImage"
import {Image} from "../../../../../../src/models/images/Image"
import {
    seedRelationshipsForSpecificImage
} from "../../../../../_toolbox/dbSeeding/images/relationships/seedRelationshipsForSpecificImage"
import {DbRelationship} from "../../../../../../src/db/types/DbRelationship"
import assert from "assert"

test('Get all "Image belongs to Node type" relationships for specific image', async () => {
    const imageNode = await seedImage()
    const amount = 7
    await seedRelationshipsForSpecificImage(imageNode, amount)

    const fetchedRelationships = await Image.getBelongsToNodeTypeRelationships(imageNode.id)

    if (!fetchedRelationships) {
        assert.fail('Could not fetch relationships')
    }

    expect(fetchedRelationships.brands)
        .toHaveLength(0)
    expect(fetchedRelationships.car_models)
        .toHaveLength(amount)

    fetchedRelationships.car_models.forEach(relationship => {
        expect(relationship.image_id)
            .toBe(imageNode.id)
        expect(relationship.relationship_name)
            .toBe(DbRelationship.NodeHasImage)
    })
})

test('Expecting empty lists when there are no relationships', async () => {
    const imageNode = await seedImage()
    const fetchedRelationships = await Image.getBelongsToNodeTypeRelationships(imageNode.id)

    if (!fetchedRelationships) {
        assert.fail('Could not fetch relationships')
    }

    expect(fetchedRelationships.brands)
        .toHaveLength(0)
    expect(fetchedRelationships.car_models)
        .toHaveLength(0)
})

test('Expecting error when there is no such image', async () => {
    const fetchedRelationships = await Image.getBelongsToNodeTypeRelationships(-42)

    expect(fetchedRelationships)
        .toBeFalsy()
})
