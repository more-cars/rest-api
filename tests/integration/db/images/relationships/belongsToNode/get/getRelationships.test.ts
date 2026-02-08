import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {NodeTypeEnum} from "../../../../../../../src/controllers/nodes/types/NodeTypeEnum"
import {
    seedRelationshipsForSpecificImage
} from "../../../../../../_toolbox/dbSeeding/images/relationships/seedRelationshipsForSpecificImage"
import {getAllRels} from "../../../../../../../src/models/relationships/getAllRels"
import {RelationshipType} from "../../../../../../../src/models/relationships/types/RelationshipType"
import {ImageNode} from "../../../../../../../src/db/nodes/images/types/ImageNode"

test('Get all "Image belongs to Node" relationships for specific image', async () => {
    const imageNode = await seedNode(NodeTypeEnum.IMAGE)
    const amount = 5
    await seedRelationshipsForSpecificImage(imageNode as ImageNode, amount)

    const fetchedRelationships = await getAllRels(imageNode.id, RelationshipType.ImageBelongsToNode)

    expect(fetchedRelationships)
        .toHaveLength(amount)

    fetchedRelationships.forEach(relationship => {
        expect(relationship.origin.id)
            .toBe(imageNode.id)
        // expect(relationship.type) // TODO deactivated because the seeder cannot handle reverse relationships at the moment
        //     .toBe(DbRelationship.NodeHasImage)
    })
})

test('Expecting empty list when there are no such relationships', async () => {
    const imageNode = await seedNode(NodeTypeEnum.IMAGE)
    const fetchedRelationships = await getAllRels(imageNode.id, RelationshipType.ImageBelongsToNode)

    expect(fetchedRelationships)
        .toHaveLength(0)
})

test('Expecting empty list when there is no such image', async () => {
    const fetchedRelationships = await getAllRels(-42, RelationshipType.ImageBelongsToNode)

    expect(fetchedRelationships)
        .toHaveLength(0)
})
