import assert from "assert"
import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../../src/db/types/DbNodeType"
import {Image} from "../../../../../../../../src/models/node-types/images/Image"
import {seedRelationshipForStartNode} from "../../../../../../../_toolbox/dbSeeding/seedRelationshipForStartNode"
import {RelationshipType} from "../../../../../../../../src/db/types/RelationshipType"
import {RelType} from "../../../../../../../../src/models/relationships/types/RelType"

test('Get all "Image belongs to Node type" relationships for specific image', async () => {
    const imageNode = await seedNode(DbNodeType.Image)
    await seedRelationshipForStartNode(imageNode.properties.id, DbNodeType.CarModel, RelationshipType.ImageBelongsToNode)
    await seedRelationshipForStartNode(imageNode.properties.id, DbNodeType.CarModel, RelationshipType.ImageBelongsToNode)
    await seedRelationshipForStartNode(imageNode.properties.id, DbNodeType.CarModel, RelationshipType.ImageBelongsToNode)
    await seedRelationshipForStartNode(imageNode.properties.id, DbNodeType.CarModel, RelationshipType.ImageBelongsToNode)

    const fetchedRelationships = await Image.getBelongsToNodeTypeRelationships(imageNode.properties.id)

    if (!fetchedRelationships) {
        assert.fail('Could not fetch relationships')
    }

    expect(fetchedRelationships.companies)
        .toHaveLength(0)
    expect(fetchedRelationships.brands)
        .toHaveLength(0)
    expect(fetchedRelationships.car_models)
        .toHaveLength(4)

    fetchedRelationships.car_models.forEach(relationship => {
        expect(relationship.origin.attributes.id)
            .toBe(imageNode.properties.id)
        expect(relationship.type)
            .toBe(RelType.ImageBelongsToNode)
    })
})

test('Expecting empty lists when there are no relationships', async () => {
    const imageNode = await seedNode(DbNodeType.Image)
    const fetchedRelationships = await Image.getBelongsToNodeTypeRelationships(imageNode.properties.id)

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
