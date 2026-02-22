import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../src/db/types/DbNodeType"
import {seedNodes} from "../../../../../../_toolbox/dbSeeding/seedNodes"
import {Image} from "../../../../../../../src/models/node-types/images/Image"
import {getRelationshipCollection} from "../../../../../../../src/db/relationships/getRelationshipCollection"
import {RelationshipType} from "../../../../../../../src/db/types/RelationshipType"

test('A IMAGE can have multiple ›is-prime-image-of-node‹ relationships', async () => {
    const image = await seedNode(DbNodeType.Image)
    const nodesAmount = 3
    const nodes = await seedNodes(DbNodeType.Company, nodesAmount)

    for (const node of nodes) {
        await Image.createIsPrimeImageOfNodeRelationship(image.properties.id, node.properties.id)
    }

    const relationships = await getRelationshipCollection(
        image.properties.id,
        RelationshipType.ImageIsPrimeImageOfNode,
    )

    expect(relationships.length)
        .toBe(nodesAmount)
})
