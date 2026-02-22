import {describe, expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../src/db/types/DbNodeType"
import {ControllerNodeType} from "../../../../../../../src/controllers/nodes/types/ControllerNodeType"
import {seedRelationshipForStartNode} from "../../../../../../_toolbox/dbSeeding/seedRelationshipForStartNode"
import {RelationshipType} from "../../../../../../../src/db/types/RelationshipType"
import {NodeNotFoundError} from "../../../../../../../src/models/types/NodeNotFoundError"
import {Company} from "../../../../../../../src/models/node-types/companies/Company"

describe('Requesting all ›has-image‹ relationships', () => {
    test('node and relationships exist', async () => {
        const company = await seedNode(DbNodeType.Company)
        await seedRelationshipForStartNode(company.properties.id, DbNodeType.Image, RelationshipType.CompanyHasImage)
        await seedRelationshipForStartNode(company.properties.id, DbNodeType.Image, RelationshipType.CompanyHasImage)

        const relationships = await Company.getAllHasImageRelationships(company.properties.id)

        expect(relationships.length)
            .toBe(2)
    })

    test('node exists, but no relationships', async () => {
        const company = await seedNode(DbNodeType.Company)

        const relationships = await Company.getAllHasImageRelationships(company.properties.id)

        expect(relationships.length)
            .toBe(0)
    })

    test('neither node, nor relationships exist', async () => {
        await expect(Company.getAllHasImageRelationships(-42))
            .rejects
            .toThrow(NodeNotFoundError)
    })
})
