---
to: tests/integration/models/<%= h.changeCase.kebab(h.inflection.pluralize(startNodeType)) %>/relationships/<%= h.changeCase.kebab(relationshipName) %>/get-sole/get-relationship.test.ts
---
import {describe, expect, test} from 'vitest'
import {<%= h.changeCase.pascal(startNodeType) %>} from "../../../../../../../src/models/<%= h.changeCase.kebab(h.inflection.pluralize(startNodeType)) %>/<%= h.changeCase.pascal(startNodeType) %>"
import {DbRelationship} from "../../../../../../../src/db/types/DbRelationship"
import {seed<%= h.changeCase.pascal(startNodeType) %>} from "../../../../../../_toolbox/dbSeeding/<%= h.changeCase.kebab(h.inflection.pluralize(startNodeType)) %>/nodes/seed<%= h.changeCase.pascal(startNodeType) %>"
import {seedRelationship} from "../../../../../../_toolbox/dbSeeding/seedRelationship"
import {validateJson} from "../../../../../../_toolbox/validateJson"
import {RelationshipSchema} from "../../../../../../_toolbox/schemas/model/RelationshipSchema"
import {NodeNotFoundError} from "../../../../../../../src/models/types/NodeNotFoundError"
import {RelationshipNotFoundError} from "../../../../../../../src/models/types/RelationshipNotFoundError"

describe('Requesting a ›<%= h.changeCase.kebab(relationshipName) %>‹ relationship', () => {
    test('node and relationship exist', async () => {
        const expectedRelationship = await seedRelationship('<%= h.changeCase.lower(startNodeType) %>', '<%= h.changeCase.lower(endNodeType) %>', DbRelationship.<%= h.changeCase.pascal(startNodeType) %><%= h.changeCase.pascal(relationshipName) %>)
        const actualRelationship = await <%= h.changeCase.pascal(startNodeType) %>.get<%= h.changeCase.pascal(relationshipName) %>Relationship(expectedRelationship.start_node_id)

        validateJson(actualRelationship, RelationshipSchema)

        expect(actualRelationship.origin.id)
            .toBe(expectedRelationship.start_node_id)

        expect(actualRelationship.destination.id)
            .toBe(expectedRelationship.end_node_id)
    })

    test('node exists, but not the relationship', async () => {
        const <%= h.changeCase.camel(startNodeType) %> = await seed<%= h.changeCase.pascal(startNodeType) %>()

        await expect(<%= h.changeCase.pascal(startNodeType) %>.get<%= h.changeCase.pascal(relationshipName) %>Relationship(<%= h.changeCase.camel(startNodeType) %>.id))
            .rejects
            .toThrow(RelationshipNotFoundError)
    })

    test('neither node, nor relationship exist', async () => {
        await expect(<%= h.changeCase.pascal(startNodeType) %>.get<%= h.changeCase.pascal(relationshipName) %>Relationship(-42))
            .rejects
            .toThrow(NodeNotFoundError)
    })
})
