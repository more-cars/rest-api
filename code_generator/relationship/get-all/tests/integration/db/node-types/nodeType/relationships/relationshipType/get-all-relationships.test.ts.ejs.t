---
to: tests/integration/db/node-types/<%= h.changeCase.kebab(h.inflection.pluralize(startNodeType)) %>/relationships/<%= h.changeCase.kebab(relationshipName) %>/get-all-relationships.test.ts
---
import {describe, expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../src/db/types/DbNodeType"
import {seedRelationshipForStartNode} from "../../../../../../_toolbox/dbSeeding/seedRelationshipForStartNode"
import {getRelationshipCollection} from "../../../../../../../src/db/relationships/getRelationshipCollection"
import {RelationshipType} from "../../../../../../../src/db/types/RelationshipType"

describe('Requesting all ›<%= h.changeCase.kebab(relationshipName) %>‹ relationships', () => {
    test('node and relationships exist', async () => {
        const <%= h.changeCase.camel(startNodeType) %> = await seedNode(DbNodeType.<%= h.changeCase.pascal(startNodeType) %>)
        await seedRelationshipForStartNode(<%= h.changeCase.camel(startNodeType) %>.properties.id, DbNodeType.<%= h.changeCase.pascal(endNodeType) %>, RelationshipType.<%= h.changeCase.pascal(startNodeType) %><%= h.changeCase.pascal(relationshipName) %>)
        await seedRelationshipForStartNode(<%= h.changeCase.camel(startNodeType) %>.properties.id, DbNodeType.<%= h.changeCase.pascal(endNodeType) %>, RelationshipType.<%= h.changeCase.pascal(startNodeType) %><%= h.changeCase.pascal(relationshipName) %>)

        const relationships = await getRelationshipCollection(
            <%= h.changeCase.camel(startNodeType) %>.properties.id,
            RelationshipType.<%= h.changeCase.pascal(startNodeType) %><%= h.changeCase.pascal(relationshipName) %>,
        )

        expect(relationships.length)
            .toBe(2)
    })

    test('node exists, but no relationships', async () => {
        const <%= h.changeCase.camel(startNodeType) %> = await seedNode(DbNodeType.<%= h.changeCase.pascal(startNodeType) %>)

        const relationships = await getRelationshipCollection(
            <%= h.changeCase.camel(startNodeType) %>.properties.id,
            RelationshipType.<%= h.changeCase.pascal(startNodeType) %><%= h.changeCase.pascal(relationshipName) %>,
        )

        expect(relationships.length)
            .toBe(0)
    })

    test('neither node, nor relationships exist', async () => {
        const relationships = await getRelationshipCollection(
            -42,
            RelationshipType.<%= h.changeCase.pascal(startNodeType) %><%= h.changeCase.pascal(relationshipName) %>,
        )

        expect(relationships.length)
            .toBe(0)
    })
})
