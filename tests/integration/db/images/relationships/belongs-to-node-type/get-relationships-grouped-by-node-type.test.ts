import {expect, test} from 'vitest'
import {seedNode} from "../../../../../_toolbox/dbSeeding/seedNode"
import {ControllerNodeType} from "../../../../../../src/controllers/nodes/types/ControllerNodeType"
import {seedRelationshipForStartNode} from "../../../../../_toolbox/dbSeeding/seedRelationshipForStartNode"
import {RelationshipType} from "../../../../../../src/db/types/RelationshipType"
import {DbNodeType} from "../../../../../../src/db/types/DbNodeType"
import {getRelationshipCollection} from "../../../../../../src/db/relationships/getRelationshipCollection"

test('Get all "Image belongs to Node type" relationships for specific image', async () => {
    const imageNode = await seedNode(DbNodeType.Image)
    await seedRelationshipForStartNode(imageNode.properties.id, DbNodeType.Brand, RelationshipType.ImageBelongsToNode)
    await seedRelationshipForStartNode(imageNode.properties.id, DbNodeType.CarModel, RelationshipType.ImageBelongsToNode)
    await seedRelationshipForStartNode(imageNode.properties.id, DbNodeType.CarModel, RelationshipType.ImageBelongsToNode)

    const companyRelationships = await getRelationshipCollection(
        imageNode.properties.id,
        RelationshipType.ImageBelongsToNode,
        DbNodeType.Company,
    )
    expect(companyRelationships)
        .toHaveLength(0)

    const brandRelationships = await getRelationshipCollection(
        imageNode.properties.id,
        RelationshipType.ImageBelongsToNode,
        DbNodeType.Brand,
    )
    expect(brandRelationships)
        .toHaveLength(1)

    const carModelRelationships = await getRelationshipCollection(
        imageNode.properties.id,
        RelationshipType.ImageBelongsToNode,
        DbNodeType.CarModel,
    )
    expect(carModelRelationships)
        .toHaveLength(2)

    carModelRelationships.forEach(relationship => {
        expect(relationship.start_node.properties.id)
            .toBe(imageNode.properties.id)
        expect(relationship.type)
            .toBe(RelationshipType.ImageBelongsToNode)
    })
})

test('Expecting empty lists when there are no such relationships', async () => {
    const imageNode = await seedNode(DbNodeType.Image)

    const companyRelationships = await getRelationshipCollection(
        imageNode.properties.id,
        RelationshipType.ImageBelongsToNode,
        DbNodeType.Company,
    )
    expect(companyRelationships)
        .toHaveLength(0)

    const brandRelationships = await getRelationshipCollection(
        imageNode.properties.id,
        RelationshipType.ImageBelongsToNode,
        DbNodeType.Brand,
    )
    expect(brandRelationships)
        .toHaveLength(0)

    const carModelRelationships = await getRelationshipCollection(
        imageNode.properties.id,
        RelationshipType.ImageBelongsToNode,
        DbNodeType.CarModel,
    )
    expect(carModelRelationships)
        .toHaveLength(0)
})

test('Expecting empty lists when there is no such image', async () => {
    const companyRelationships = await getRelationshipCollection(
        -41,
        RelationshipType.ImageBelongsToNode,
        DbNodeType.Company,
    )
    expect(companyRelationships)
        .toHaveLength(0)

    const brandRelationships = await getRelationshipCollection(
        -42,
        RelationshipType.ImageBelongsToNode,
        DbNodeType.Brand,
    )
    expect(brandRelationships)
        .toHaveLength(0)

    const carModelRelationships = await getRelationshipCollection(
        -43,
        RelationshipType.ImageBelongsToNode,
        DbNodeType.CarModel,
    )
    expect(carModelRelationships)
        .toHaveLength(0)
})
