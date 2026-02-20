import {describe, expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {ControllerNodeType} from "../../../../../../../src/controllers/nodes/types/ControllerNodeType"
import {seedRelationshipForStartNode} from "../../../../../../_toolbox/dbSeeding/seedRelationshipForStartNode"
import {getRelationshipCollection} from "../../../../../../../src/db/relationships/getRelationshipCollection"
import {RelationshipType} from "../../../../../../../src/db/types/RelationshipType"

describe('Requesting all ›is-prime-image-of-node‹ relationships', () => {
    test('node and relationships exist', async () => {
        const image = await seedNode(ControllerNodeType.IMAGE)
        await seedRelationshipForStartNode(image.id, ControllerNodeType.COMPANY, RelationshipType.ImageIsPrimeImageOfNode)
        await seedRelationshipForStartNode(image.id, ControllerNodeType.CAR_MODEL, RelationshipType.ImageIsPrimeImageOfNode)
        await seedRelationshipForStartNode(image.id, ControllerNodeType.BRAND, RelationshipType.ImageIsPrimeImageOfNode)

        const relationships = await getRelationshipCollection(
            image.id,
            RelationshipType.ImageIsPrimeImageOfNode,
        )

        expect(relationships.length)
            .toBe(3)
    })

    test('node exists, but no relationships', async () => {
        const image = await seedNode(ControllerNodeType.IMAGE)

        const relationships = await getRelationshipCollection(
            image.id,
            RelationshipType.ImageIsPrimeImageOfNode,
        )

        expect(relationships.length)
            .toBe(0)
    })

    test('neither node, nor relationships exist', async () => {
        const relationships = await getRelationshipCollection(
            -42,
            RelationshipType.ImageIsPrimeImageOfNode,
        )

        expect(relationships.length)
            .toBe(0)
    })
})
