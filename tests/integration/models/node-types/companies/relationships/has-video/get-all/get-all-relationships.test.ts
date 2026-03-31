import {describe, expect, test} from 'vitest'
import {Company} from "../../../../../../../../src/models/node-types/companies/Company"
import {seedNode} from "../../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../../src/db/types/DbNodeType"
import {seedRelationshipForStartNode} from "../../../../../../../_toolbox/dbSeeding/seedRelationshipForStartNode"
import {RelationshipType} from "../../../../../../../../src/db/types/RelationshipType"
import {NodeNotFoundError} from "../../../../../../../../src/models/types/NodeNotFoundError"

describe('Requesting all ›has-video‹ relationships', () => {
    test('node and relationships exist', async () => {
        const company = await seedNode(DbNodeType.Company)
        await seedRelationshipForStartNode(company.properties.id, DbNodeType.Video, RelationshipType.CompanyHasVideo)
        await seedRelationshipForStartNode(company.properties.id, DbNodeType.Video, RelationshipType.CompanyHasVideo)

        const relationships = await Company.getAllHasVideoRelationships(company.properties.id)

        expect(relationships.length)
            .toBe(2)
    })

    test('node exists, but no relationships', async () => {
        const company = await seedNode(DbNodeType.Company)

        const relationships = await Company.getAllHasVideoRelationships(company.properties.id)

        expect(relationships.length)
            .toBe(0)
    })

    test('neither node, nor relationships exist', async () => {
        await expect(Company.getAllHasVideoRelationships(-42))
            .rejects
            .toThrow(NodeNotFoundError)
    })
})
