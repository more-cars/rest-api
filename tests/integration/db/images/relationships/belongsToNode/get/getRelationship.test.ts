import {seedImage} from "../../../../../../dbSeeding/images/nodes/seedImage"
import {seedCarModel} from "../../../../../../dbSeeding/car-models/nodes/seedCarModel"
import {seedRelationship} from "../../../../../../dbSeeding/images/relationships/seedRelationship"
import {getSpecificRelationship} from "../../../../../../../src/db/relationships/getSpecificRelationship"
import {DbRelationship} from "../../../../../../../src/db/types/DbRelationship"
import assert from "assert"

test('Get a "Image belongs to Node" relationship when both nodes exist', async () => {
    const relationship = await seedRelationship()

    if (!relationship) {
        assert.fail("Failed to seed relationship")
    }

    const imageId = relationship.start_node_id
    const partnerNodeId = relationship.end_node_id
    const relationshipId = relationship.relationship_id
    const relationshipName = relationship.relationship_name

    const fetchedRelationship =
        await getSpecificRelationship(partnerNodeId, imageId, DbRelationship.NodeHasImage)

    expect(fetchedRelationship)
        .toHaveProperty('start_node_id', partnerNodeId)
    expect(fetchedRelationship)
        .toHaveProperty('end_node_id', imageId)
    expect(fetchedRelationship)
        .toHaveProperty('relationship_id', relationshipId)
    expect(fetchedRelationship)
        .toHaveProperty('relationship_name', relationshipName)
    expect(fetchedRelationship)
        .toHaveProperty('created_at')
    expect(fetchedRelationship)
        .toHaveProperty('updated_at')
})

test('Trying to get image relationship when image node does not exist', async () => {
    const imageNode = {id: -42}
    const partnerNode = await seedCarModel()
    const relationship = await getSpecificRelationship(partnerNode.id, imageNode.id, DbRelationship.NodeHasImage)

    expect(relationship).toBeFalsy()
})

test('Trying to get image relationship when partner node does not exist', async () => {
    const imageNode = await seedImage()
    const partnerNode = await seedCarModel()
    const relationship = await getSpecificRelationship(partnerNode.id, imageNode.id, DbRelationship.NodeHasImage)

    expect(relationship).toBeFalsy()
})

test('Trying to get image relationship when both nodes do not exist', async () => {
    const imageNode = {id: -41}
    const partnerNode = {id: -42}
    const relationship = await getSpecificRelationship(partnerNode.id, imageNode.id, DbRelationship.NodeHasImage)

    expect(relationship).toBeFalsy()
})

test('Trying to get image relationship when there is none', async () => {
    const imageNode = await seedImage()
    const partnerNode = await seedCarModel()
    const relationship = await getSpecificRelationship(partnerNode.id, imageNode.id, DbRelationship.NodeHasImage)

    expect(relationship).toBeFalsy()
})
