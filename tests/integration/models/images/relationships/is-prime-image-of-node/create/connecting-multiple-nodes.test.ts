import {expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {seedNodes} from "../../../../../../_toolbox/dbSeeding/seedNodes"
import {ControllerNodeType} from "../../../../../../../src/controllers/nodes/types/ControllerNodeType"
import {Image} from "../../../../../../../src/models/node-types/images/Image"
import {getRelationshipCollection} from "../../../../../../../src/db/relationships/getRelationshipCollection"
import {RelationshipType} from "../../../../../../../src/db/types/RelationshipType"

test('A IMAGE can have multiple ›is-prime-image-of-node‹ relationships', async () => {
    const image = await seedNode(ControllerNodeType.IMAGE)
    const nodesAmount = 3
    const nodes = await seedNodes(ControllerNodeType.COMPANY, nodesAmount)

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
