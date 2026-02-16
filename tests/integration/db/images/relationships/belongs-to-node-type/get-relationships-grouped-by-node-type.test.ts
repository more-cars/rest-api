import {expect, test} from 'vitest'
import {seedNode} from "../../../../../_toolbox/dbSeeding/seedNode"
import {NodeTypeEnum} from "../../../../../../src/controllers/nodes/types/NodeTypeEnum"
import {seedRelationshipForStartNode} from "../../../../../_toolbox/dbSeeding/seedRelationshipForStartNode"
import {DbRelationship} from "../../../../../../src/db/types/DbRelationship"
import {NodeTypeLabel} from "../../../../../../src/db/NodeTypeLabel"
import {getRelationshipCollection} from "../../../../../../src/db/relationships/getRelationshipCollection"

test('Get all "Image belongs to Node type" relationships for specific image', async () => {
    const imageNode = await seedNode(NodeTypeEnum.IMAGE)
    await seedRelationshipForStartNode(imageNode.id, NodeTypeEnum.BRAND, DbRelationship.ImageBelongsToNode)
    await seedRelationshipForStartNode(imageNode.id, NodeTypeEnum.CAR_MODEL, DbRelationship.ImageBelongsToNode)
    await seedRelationshipForStartNode(imageNode.id, NodeTypeEnum.CAR_MODEL, DbRelationship.ImageBelongsToNode)

    const companyRelationships = await getRelationshipCollection(
        imageNode.id,
        DbRelationship.ImageBelongsToNode,
        NodeTypeLabel.Company,
    )
    expect(companyRelationships)
        .toHaveLength(0)

    const brandRelationships = await getRelationshipCollection(
        imageNode.id,
        DbRelationship.ImageBelongsToNode,
        NodeTypeLabel.Brand,
    )
    expect(brandRelationships)
        .toHaveLength(1)

    const carModelRelationships = await getRelationshipCollection(
        imageNode.id,
        DbRelationship.ImageBelongsToNode,
        NodeTypeLabel.CarModel,
    )
    expect(carModelRelationships)
        .toHaveLength(2)

    carModelRelationships.forEach(relationship => {
        expect(relationship.start_node_id)
            .toBe(imageNode.id)
        expect(relationship.relationship_name)
            .toBe(DbRelationship.ImageBelongsToNode)
    })
})

test('Expecting empty lists when there are no such relationships', async () => {
    const imageNode = await seedNode(NodeTypeEnum.IMAGE)

    const companyRelationships = await getRelationshipCollection(
        imageNode.id,
        DbRelationship.ImageBelongsToNode,
        NodeTypeLabel.Company,
    )
    expect(companyRelationships)
        .toHaveLength(0)

    const brandRelationships = await getRelationshipCollection(
        imageNode.id,
        DbRelationship.ImageBelongsToNode,
        NodeTypeLabel.Brand,
    )
    expect(brandRelationships)
        .toHaveLength(0)

    const carModelRelationships = await getRelationshipCollection(
        imageNode.id,
        DbRelationship.ImageBelongsToNode,
        NodeTypeLabel.CarModel,
    )
    expect(carModelRelationships)
        .toHaveLength(0)
})

test('Expecting empty lists when there is no such image', async () => {
    const companyRelationships = await getRelationshipCollection(
        -41,
        DbRelationship.ImageBelongsToNode,
        NodeTypeLabel.Company,
    )
    expect(companyRelationships)
        .toHaveLength(0)

    const brandRelationships = await getRelationshipCollection(
        -42,
        DbRelationship.ImageBelongsToNode,
        NodeTypeLabel.Brand,
    )
    expect(brandRelationships)
        .toHaveLength(0)

    const carModelRelationships = await getRelationshipCollection(
        -43,
        DbRelationship.ImageBelongsToNode,
        NodeTypeLabel.CarModel,
    )
    expect(carModelRelationships)
        .toHaveLength(0)
})
