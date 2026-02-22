import {describe, expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../src/db/types/DbNodeType"
import {ControllerNodeType} from "../../../../../../../src/controllers/nodes/types/ControllerNodeType"
import {seedRelationshipForStartNode} from "../../../../../../_toolbox/dbSeeding/seedRelationshipForStartNode"
import {RelationshipType} from "../../../../../../../src/db/types/RelationshipType"
import {NodeNotFoundError} from "../../../../../../../src/models/types/NodeNotFoundError"
import {Image} from "../../../../../../../src/models/node-types/images/Image"

describe('Requesting all ›belongs-to-node‹ relationships', () => {
    test('node and relationships exist', async () => {
        const image = await seedNode(DbNodeType.Image)
        await seedRelationshipForStartNode(image.properties.id, DbNodeType.Brand, RelationshipType.ImageBelongsToNode)
        await seedRelationshipForStartNode(image.properties.id, DbNodeType.Brand, RelationshipType.ImageBelongsToNode)

        const relationships = await Image.getAllBelongsToNodeRelationships(image.properties.id)

        expect(relationships.length)
            .toBe(2)
    })

    test('node exists, but no relationships', async () => {
        const image = await seedNode(DbNodeType.Image)

        const relationships = await Image.getAllBelongsToNodeRelationships(image.properties.id)

        expect(relationships.length)
            .toBe(0)
    })

    test('neither node, nor relationships exist', async () => {
        await expect(Image.getAllBelongsToNodeRelationships(-42))
            .rejects
            .toThrow(NodeNotFoundError)
    })
})
