import {describe, expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../src/db/types/DbNodeType"
import {seedRelationshipForStartNode} from "../../../../../../_toolbox/dbSeeding/seedRelationshipForStartNode"
import {getRelationshipCollection} from "../../../../../../../src/db/relationships/getRelationshipCollection"
import {RelationshipType} from "../../../../../../../src/db/types/RelationshipType"

describe('Requesting all ›is-prime-image-of-node‹ relationships', () => {
    test('node and relationships exist', async () => {
        const image = await seedNode(DbNodeType.Image)
        await seedRelationshipForStartNode(image.properties.id, DbNodeType.Company, RelationshipType.ImageIsPrimeImageOfNode)
        await seedRelationshipForStartNode(image.properties.id, DbNodeType.CarModel, RelationshipType.ImageIsPrimeImageOfNode)
        await seedRelationshipForStartNode(image.properties.id, DbNodeType.Brand, RelationshipType.ImageIsPrimeImageOfNode)

        const relationships = await getRelationshipCollection(
            image.properties.id,
            RelationshipType.ImageIsPrimeImageOfNode,
        )

        expect(relationships.length)
            .toBe(3)
    })

    test('node exists, but no relationships', async () => {
        const image = await seedNode(DbNodeType.Image)

        const relationships = await getRelationshipCollection(
            image.properties.id,
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
