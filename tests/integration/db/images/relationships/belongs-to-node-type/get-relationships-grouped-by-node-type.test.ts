import {expect, test} from 'vitest'
import {seedNode} from "../../../../../_toolbox/dbSeeding/seedNode"
import {NodeTypeEnum} from "../../../../../../src/controllers/nodes/types/NodeTypeEnum"
import {seedRelationshipForStartNode} from "../../../../../_toolbox/dbSeeding/seedRelationshipForStartNode"
import {
    fetchImageRelationshipsForNodeType
} from "../../../../../../src/db/nodes/images/getBelongsToNodeTypeRelationships"
import {DbRelationship} from "../../../../../../src/db/types/DbRelationship"
import {NodeTypeLabel} from "../../../../../../src/db/NodeTypeLabel"

test('Get all "Image belongs to Node type" relationships for specific image', async () => {
    const imageNode = await seedNode(NodeTypeEnum.IMAGE)
    await seedRelationshipForStartNode(imageNode.id, NodeTypeEnum.BRAND, DbRelationship.ImageBelongsToNode)
    await seedRelationshipForStartNode(imageNode.id, NodeTypeEnum.CAR_MODEL, DbRelationship.ImageBelongsToNode)
    await seedRelationshipForStartNode(imageNode.id, NodeTypeEnum.CAR_MODEL, DbRelationship.ImageBelongsToNode)

    const companyRelationships = await fetchImageRelationshipsForNodeType(NodeTypeLabel.Company, imageNode.id)
    expect(companyRelationships)
        .toHaveLength(0)

    const brandRelationships = await fetchImageRelationshipsForNodeType(NodeTypeLabel.Brand, imageNode.id)
    expect(brandRelationships)
        .toHaveLength(1)

    const carModelRelationships = await fetchImageRelationshipsForNodeType(NodeTypeLabel.CarModel, imageNode.id)
    expect(carModelRelationships)
        .toHaveLength(2)

    carModelRelationships.forEach(relationship => {
        expect(relationship.start_node_id)
            .toBe(imageNode.id)
        expect(relationship.relationship_name)
            .toBe(DbRelationship.NodeHasImage)
    })
})

test('Expecting empty lists when there are no such relationships', async () => {
    const imageNode = await seedNode(NodeTypeEnum.IMAGE)

    const companyRelationships = await fetchImageRelationshipsForNodeType(NodeTypeLabel.Brand, imageNode.id)
    expect(companyRelationships)
        .toHaveLength(0)

    const brandRelationships = await fetchImageRelationshipsForNodeType(NodeTypeLabel.Brand, imageNode.id)
    expect(brandRelationships)
        .toHaveLength(0)

    const carModelRelationships = await fetchImageRelationshipsForNodeType(NodeTypeLabel.CarModel, imageNode.id)
    expect(carModelRelationships)
        .toHaveLength(0)
})

test('Expecting empty lists when there is no such image', async () => {
    const companyRelationships = await fetchImageRelationshipsForNodeType(NodeTypeLabel.Brand, -42)
    expect(companyRelationships)
        .toHaveLength(0)

    const brandRelationships = await fetchImageRelationshipsForNodeType(NodeTypeLabel.Brand, -42)
    expect(brandRelationships)
        .toHaveLength(0)

    const carModelRelationships = await fetchImageRelationshipsForNodeType(NodeTypeLabel.CarModel, -42)
    expect(carModelRelationships)
        .toHaveLength(0)
})
