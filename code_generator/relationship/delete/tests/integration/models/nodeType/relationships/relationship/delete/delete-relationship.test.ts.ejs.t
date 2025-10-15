---
to: tests/integration/models/<%= h.changeCase.kebab(h.inflection.pluralize(startNodeType)) %>/relationships/<%= h.changeCase.kebab(relationshipName) %>/delete/delete-relationship.test.ts
---
import {describe, expect, test} from 'vitest'
import {<%= h.changeCase.pascal(startNodeType) %>} from "../../../../../../../src/models/<%= h.changeCase.kebab(h.inflection.pluralize(startNodeType)) %>/<%= h.changeCase.pascal(startNodeType) %>"
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {seedRelationship} from "../../../../../../_toolbox/dbSeeding/seedRelationship"
import {getSpecificRelationship} from "../../../../../../../src/db/relationships/getSpecificRelationship"
import {DbRelationship} from "../../../../../../../src/db/types/DbRelationship"
import {NodeNotFoundError} from "../../../../../../../src/models/types/NodeNotFoundError"
import {RelationshipNotFoundError} from "../../../../../../../src/models/types/RelationshipNotFoundError"

describe('Deleting a ›<%= h.changeCase.kebab(relationshipName) %>‹ relationship', () => {
    test('<%= h.changeCase.upper(startNodeType) %> node does not exist', async () => {
        const <%= h.changeCase.camel(startNodeType) %> = await seedNode('<%= h.changeCase.lower(startNodeType) %>')

        await expect(<%= h.changeCase.pascal(startNodeType) %>.delete<%= h.changeCase.pascal(relationshipName) %>Relationship(<%= h.changeCase.camel(startNodeType) %>.id, -43))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('<%= h.changeCase.upper(endNodeType) %> node does not exist', async () => {
        const <%= h.changeCase.camel(endNodeType) %> = await seedNode('<%= h.changeCase.lower(startNodeType) %>')

        await expect(<%= h.changeCase.pascal(startNodeType) %>.delete<%= h.changeCase.pascal(relationshipName) %>Relationship(-42, <%= h.changeCase.camel(endNodeType) %>.id))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('<%= h.changeCase.upper(endNodeType) %> node and <%= h.changeCase.upper(endNodeType) %> node do not exist', async () => {
        await expect(<%= h.changeCase.pascal(startNodeType) %>.delete<%= h.changeCase.pascal(relationshipName) %>Relationship(-42, -43))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('both nodes exist, but have no ›<%= h.changeCase.kebab(relationshipName) %>‹ relationship', async () => {
        const <%= h.changeCase.camel(startNodeType) %> = await seedNode('<%= h.changeCase.lower(startNodeType) %>')
        const <%= h.changeCase.camel(endNodeType) %> = await seedNode('<%= h.changeCase.lower(endNodeType) %>')

        await expect(<%= h.changeCase.pascal(startNodeType) %>.delete<%= h.changeCase.pascal(relationshipName) %>Relationship(<%= h.changeCase.camel(startNodeType) %>.id, <%= h.changeCase.camel(endNodeType) %>.id))
            .rejects
            .toThrow(RelationshipNotFoundError)
    })

    test('both nodes exist and have a ›<%= h.changeCase.kebab(relationshipName) %>‹ relationship', async () => {
        const seededRelationship = await seedRelationship('<%= h.changeCase.lower(startNodeType) %>', '<%= h.changeCase.lower(endNodeType) %>', DbRelationship.<%= h.changeCase.pascal(startNodeType) %><%= h.changeCase.pascal(relationshipName) %>)

        const relationshipBefore = await getSpecificRelationship(
            seededRelationship.start_node_id,
            seededRelationship.end_node_id,
            DbRelationship.<%= h.changeCase.pascal(startNodeType) %><%= h.changeCase.pascal(relationshipName) %>,
        )

        expect(relationshipBefore)
            .toBeTruthy()

        await <%= h.changeCase.pascal(startNodeType) %>.delete<%= h.changeCase.pascal(relationshipName) %>Relationship(seededRelationship.start_node_id, seededRelationship.end_node_id)

        const relationshipAfter = await getSpecificRelationship(
            seededRelationship.start_node_id,
            seededRelationship.end_node_id,
            DbRelationship.<%= h.changeCase.pascal(startNodeType) %><%= h.changeCase.pascal(relationshipName) %>,
        )

        expect(relationshipAfter)
            .toBeFalsy()
    })
})
