---
to: tests/integration/models/node-types/<%= h.changeCase.kebab(h.inflection.pluralize(startNodeType)) %>/relationships/<%= h.changeCase.kebab(relationshipName) %>/get-all/get-all-relationships.test.ts
---
import {describe, expect, test} from 'vitest'
import {<%= h.changeCase.pascal(startNodeType) %>} from "../../../../../../../../src/models/node-types/<%= h.changeCase.kebab(h.inflection.pluralize(startNodeType)) %>/<%= h.changeCase.pascal(startNodeType) %>"
import {seedNode} from "../../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../../src/db/types/DbNodeType"
import {seedRelationshipForStartNode} from "../../../../../../../_toolbox/dbSeeding/seedRelationshipForStartNode"
import {RelationshipType} from "../../../../../../../../src/db/types/RelationshipType"
import {NodeNotFoundError} from "../../../../../../../../src/models/types/NodeNotFoundError"

describe('Requesting all ›<%= h.changeCase.kebab(relationshipName) %>‹ relationships', () => {
    test('node and relationships exist', async () => {
        const <%= h.changeCase.camel(startNodeType) %> = await seedNode(DbNodeType.<%= h.changeCase.pascal(startNodeType) %>)
        await seedRelationshipForStartNode(<%= h.changeCase.camel(startNodeType) %>.properties.id, DbNodeType.<%= h.changeCase.pascal(endNodeType) %>, RelationshipType.<%= h.changeCase.pascal(startNodeType) %><%= h.changeCase.pascal(relationshipName) %>)
        await seedRelationshipForStartNode(<%= h.changeCase.camel(startNodeType) %>.properties.id, DbNodeType.<%= h.changeCase.pascal(endNodeType) %>, RelationshipType.<%= h.changeCase.pascal(startNodeType) %><%= h.changeCase.pascal(relationshipName) %>)

        const relationships = await <%= h.changeCase.pascal(startNodeType) %>.getAll<%= h.changeCase.pascal(relationshipName) %>Relationships(<%= h.changeCase.camel(startNodeType) %>.properties.id)

        expect(relationships.length)
            .toBe(2)
    })

    test('node exists, but no relationships', async () => {
        const <%= h.changeCase.camel(startNodeType) %> = await seedNode(DbNodeType.<%= h.changeCase.pascal(startNodeType) %>)

        const relationships = await <%= h.changeCase.pascal(startNodeType) %>.getAll<%= h.changeCase.pascal(relationshipName) %>Relationships(<%= h.changeCase.camel(startNodeType) %>.properties.id)

        expect(relationships.length)
            .toBe(0)
    })

    test('neither node, nor relationships exist', async () => {
        await expect(<%= h.changeCase.pascal(startNodeType) %>.getAll<%= h.changeCase.pascal(relationshipName) %>Relationships(-42))
            .rejects
            .toThrow(NodeNotFoundError)
    })
})
