import {describe, expect, test} from 'vitest'
import {createRelationship} from "../../../../../../../src/db/relationships/createRelationship"
import {DbRelationship} from "../../../../../../../src/db/types/DbRelationship"
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {NodeTypeEnum} from "../../../../../../../src/controllers/nodes/types/NodeTypeEnum"
import {CompanyRelationship} from "../../../../../../../src/models/companies/types/CompanyRelationship"

describe('Creating a ›is-prime-image-of-node‹ relationship', () => {
    test('with valid data', async () => {
        const image = await seedNode(NodeTypeEnum.IMAGE)
        const node = await seedNode(NodeTypeEnum.COMPANY)

        const createdRelationship = await createRelationship(
            node.id,
            image.id,
            DbRelationship.ImageIsPrimeImageOfNode,
        )

        expect(createdRelationship)
            .toHaveProperty('start_node_id', node.id)
        expect(createdRelationship)
            .toHaveProperty('end_node_id', image.id)
        expect(createdRelationship)
            .toHaveProperty('relationship_id')
        expect(createdRelationship)
            .toHaveProperty('relationship_name', CompanyRelationship.hasPrimeImage)
        expect(createdRelationship)
            .toHaveProperty('created_at')
        expect(createdRelationship)
            .toHaveProperty('updated_at')
    })

    test('with invalid data', async () => {
        const image = await seedNode(NodeTypeEnum.IMAGE)

        const createdRelationship = await createRelationship(
            -42,
            image.id,
            DbRelationship.ImageIsPrimeImageOfNode,
        )

        expect(createdRelationship)
            .toEqual(false)
    })
})
