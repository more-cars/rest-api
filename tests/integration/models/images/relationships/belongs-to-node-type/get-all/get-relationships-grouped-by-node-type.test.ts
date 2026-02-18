import assert from "assert"
import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {NodeTypeEnum} from "../../../../../../../src/controllers/nodes/types/NodeTypeEnum"
import {Image} from "../../../../../../../src/models/images/Image"
import {seedRelationshipForStartNode} from "../../../../../../_toolbox/dbSeeding/seedRelationshipForStartNode"
import {RelationshipType} from "../../../../../../../src/db/types/RelationshipType"
import {RelationType} from "../../../../../../../src/controllers/relationships/types/RelationType"

test('Get all "Image belongs to Node type" relationships for specific image', async () => {
    const imageNode = await seedNode(NodeTypeEnum.IMAGE)
    await seedRelationshipForStartNode(imageNode.id, NodeTypeEnum.CAR_MODEL, RelationshipType.ImageBelongsToNode)
    await seedRelationshipForStartNode(imageNode.id, NodeTypeEnum.CAR_MODEL, RelationshipType.ImageBelongsToNode)
    await seedRelationshipForStartNode(imageNode.id, NodeTypeEnum.CAR_MODEL, RelationshipType.ImageBelongsToNode)
    await seedRelationshipForStartNode(imageNode.id, NodeTypeEnum.CAR_MODEL, RelationshipType.ImageBelongsToNode)

    const fetchedRelationships = await Image.getBelongsToNodeTypeRelationships(imageNode.id)

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
        expect(relationship.origin.id)
            .toBe(imageNode.id)
        expect(relationship.type)
            .toBe(RelationType.ImageBelongsToNode)
    })
})

test('Expecting empty lists when there are no relationships', async () => {
    const imageNode = await seedNode(NodeTypeEnum.IMAGE)
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
