---
to: tests/integration/db/<%= h.changeCase.kebab(h.inflection.pluralize(startNodeType)) %>/relationships/<%= h.changeCase.kebab(relationshipName) %>/get-sole/get-relationship.test.ts
---
import {describe, expect, test} from 'vitest'
import {getRelationshipsForSpecificNode} from "../../../../../../../src/db/relationships/getRelationshipsForSpecificNode"
import {DbRelationship} from "../../../../../../../src/db/types/DbRelationship"
import {seed<%= h.changeCase.pascal(startNodeType) %>} from "../../../../../../_toolbox/dbSeeding/<%= h.changeCase.kebab(h.inflection.pluralize(startNodeType)) %>/nodes/seed<%= h.changeCase.pascal(startNodeType) %>"
import {seedRelationship} from "../../../../../../_toolbox/dbSeeding/seedRelationship"

describe('Requesting a ›<%= h.changeCase.kebab(relationshipName) %>‹ relationship', () => {
    test('node and relationship exist', async () => {
        const relationship = await seedRelationship('<%= h.changeCase.lower(startNodeType) %>', '<%= h.changeCase.lower(endNodeType) %>', DbRelationship.<%= h.changeCase.pascal(startNodeType) %><%= h.changeCase.pascal(relationshipName) %>)

        const relationships = await getRelationshipsForSpecificNode(
            relationship.start_node_id,
            DbRelationship.<%= h.changeCase.pascal(startNodeType) %><%= h.changeCase.pascal(relationshipName) %>,
        )

        expect(relationships.length)
            .toBe(1)
    })

    test('node exists, but not the relationship', async () => {
        const <%= h.changeCase.camel(startNodeType) %> = await seed<%= h.changeCase.pascal(startNodeType) %>()

        const relationships = await getRelationshipsForSpecificNode(
            <%= h.changeCase.camel(startNodeType) %>.id,
            DbRelationship.<%= h.changeCase.pascal(startNodeType) %><%= h.changeCase.pascal(relationshipName) %>,
        )

        expect(relationships.length)
            .toBe(0)
    })

    test('neither node, nor relationship exist', async () => {
        const relationships = await getRelationshipsForSpecificNode(
            -42,
            DbRelationship.<%= h.changeCase.pascal(startNodeType) %><%= h.changeCase.pascal(relationshipName) %>,
        )

        expect(relationships.length)
            .toBe(0)
    })
})
