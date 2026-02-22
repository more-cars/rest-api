import {describe, expect, test} from 'vitest'
import {Image} from "../../../../../../../src/models/node-types/images/Image"
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../src/db/types/DbNodeType"
import {ControllerNodeType} from "../../../../../../../src/controllers/nodes/types/ControllerNodeType"
import {seedRelationshipForStartNode} from "../../../../../../_toolbox/dbSeeding/seedRelationshipForStartNode"
import {RelationshipType} from "../../../../../../../src/db/types/RelationshipType"
import {NodeNotFoundError} from "../../../../../../../src/models/types/NodeNotFoundError"

describe('Requesting all ›is-prime-image-of-node‹ relationships', () => {
    test('node and relationships exist', async () => {
        const image = await seedNode(DbNodeType.Image)
        await seedRelationshipForStartNode(image.properties.id, DbNodeType.Company, RelationshipType.ImageIsPrimeImageOfNode)
        await seedRelationshipForStartNode(image.properties.id, DbNodeType.CarModel, RelationshipType.ImageIsPrimeImageOfNode)
        await seedRelationshipForStartNode(image.properties.id, DbNodeType.Brand, RelationshipType.ImageIsPrimeImageOfNode)

        const relationships = await Image.getAllIsPrimeImageOfNodeRelationships(image.properties.id)

        expect(relationships.length)
            .toBe(3)
    })

    test('node exists, but no relationships', async () => {
        const image = await seedNode(DbNodeType.Image)

        const relationships = await Image.getAllIsPrimeImageOfNodeRelationships(image.properties.id)

        expect(relationships.length)
            .toBe(0)
    })

    test('neither node, nor relationships exist', async () => {
        await expect(Image.getAllIsPrimeImageOfNodeRelationships(-42))
            .rejects
            .toThrow(NodeNotFoundError)
    })
})
