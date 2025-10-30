import {describe, expect, test} from 'vitest'
import {Image} from "../../../../../../../src/models/images/Image"
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {NodeTypeEnum} from "../../../../../../../src/controllers/nodes/types/NodeTypeEnum"
import {seedRelationshipForStartNode} from "../../../../../../_toolbox/dbSeeding/seedRelationshipForStartNode"
import {DbRelationship} from "../../../../../../../src/db/types/DbRelationship"
import {NodeNotFoundError} from "../../../../../../../src/models/types/NodeNotFoundError"

describe('Requesting all ›is-prime-image-of-node‹ relationships', () => {
    test('node and relationships exist', async () => {
        const image = await seedNode(NodeTypeEnum.IMAGE)
        await seedRelationshipForStartNode(image.id, NodeTypeEnum.COMPANY, DbRelationship.ImageIsPrimeImageOfNode)
        await seedRelationshipForStartNode(image.id, NodeTypeEnum.CAR_MODEL, DbRelationship.ImageIsPrimeImageOfNode)
        await seedRelationshipForStartNode(image.id, NodeTypeEnum.BRAND, DbRelationship.ImageIsPrimeImageOfNode)

        const relationships = await Image.getAllIsPrimeImageOfNodeRelationships(image.id)

        expect(relationships.length)
            .toBe(3)
    })

    test('node exists, but no relationships', async () => {
        const image = await seedNode(NodeTypeEnum.IMAGE)

        const relationships = await Image.getAllIsPrimeImageOfNodeRelationships(image.id)

        expect(relationships.length)
            .toBe(0)
    })

    test('neither node, nor relationships exist', async () => {
        await expect(Image.getAllIsPrimeImageOfNodeRelationships(-42))
            .rejects
            .toThrow(NodeNotFoundError)
    })
})
