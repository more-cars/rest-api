import {describe, expect, test} from 'vitest'
import {Brand} from "../../../../../../../../src/models/node-types/brands/Brand"
import {RelationshipType} from "../../../../../../../../src/db/types/RelationshipType"
import {seedNode} from "../../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../../src/db/types/DbNodeType"
import {seedRelationship} from "../../../../../../../_toolbox/dbSeeding/seedRelationship"
import {validateJson} from "../../../../../../../_toolbox/validateJson"
import {RelationshipSchema} from "../../../../../../../_toolbox/schemas/model/RelationshipSchema"
import {NodeNotFoundError} from "../../../../../../../../src/models/types/NodeNotFoundError"
import {RelNotFoundError} from "../../../../../../../../src/models/types/RelNotFoundError"

describe('Requesting a ›belongs-to-company‹ relationship', () => {
    test('node and relationship exist', async () => {
        const expectedRelationship = await seedRelationship(DbNodeType.Brand, DbNodeType.Company, RelationshipType.BrandBelongsToCompany)
        const expectedBrandId = expectedRelationship.start_node.properties.id
        const expectedCompanyId = expectedRelationship.end_node.properties.id
        const actualRelationship = await Brand.getBelongsToCompanyRelationship(expectedBrandId)

        expect(validateJson(actualRelationship, RelationshipSchema))
            .toBeTruthy()

        expect(actualRelationship.origin.attributes.id)
            .toBe(expectedBrandId)

        expect(actualRelationship.destination.attributes.id)
            .toBe(expectedCompanyId)
    })

    test('node exists, but not the relationship', async () => {
        const brand = await seedNode(DbNodeType.Brand)

        await expect(Brand.getBelongsToCompanyRelationship(brand.properties.id))
            .rejects
            .toThrow(RelNotFoundError)
    })

    test('neither node, nor relationship exist', async () => {
        await expect(Brand.getBelongsToCompanyRelationship(-42))
            .rejects
            .toThrow(NodeNotFoundError)
    })
})
