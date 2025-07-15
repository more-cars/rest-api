import {seedImage} from "../../../../../dbSeeding/images/nodes/seedImage"
import {Image} from "../../../../../../src/models/images/Image"
import {
    seedRelationshipsForSpecificImage
} from "../../../../../dbSeeding/images/relationships/seedRelationshipsForSpecificImage"
import {DbRelationship} from "../../../../../../src/db/types/DbRelationship"
import assert from "assert"

test('Get all "Image belongs to Node" relationships for specific image', async () => {
    const imageNode = await seedImage()
    const amount = 7
    await seedRelationshipsForSpecificImage(imageNode, amount)

    const fetchedRelationships = await Image.getBelongsToNodeRelationships(imageNode.id)

    if (!fetchedRelationships) {
        assert.fail('Could not fetch relationships')
    }

    expect(fetchedRelationships)
        .toHaveLength(amount)

    fetchedRelationships.forEach(relationship => {
        expect(relationship.image_id)
            .toBe(imageNode.id)
        expect(relationship.relationship_name)
            .toBe(DbRelationship.NodeHasImage)
    })
})

test('Expecting empty list when there are no such relationships', async () => {
    const imageNode = await seedImage()
    const fetchedRelationships = await Image.getBelongsToNodeRelationships(imageNode.id)

    expect(fetchedRelationships)
        .toHaveLength(0)
})

test('Expecting error when there is no such image', async () => {
    const fetchedRelationships = await Image.getBelongsToNodeRelationships(-42)

    expect(fetchedRelationships)
        .toBeFalsy()
})
