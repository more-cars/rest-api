---
to: tests/integration/models/node-types/<%= h.changeCase.kebab(h.inflection.pluralize(startNodeType)) %>/relationships/<%= h.changeCase.kebab(relationshipName) %>/delete/delete-relationship.test.ts
---
import {describe, expect, test} from 'vitest'
import {<%= h.changeCase.pascal(startNodeType) %>} from "../../../../../../../../src/models/node-types/<%= h.changeCase.kebab(h.inflection.pluralize(startNodeType)) %>/<%= h.changeCase.pascal(startNodeType) %>"
import {seedNode} from "../../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../../src/db/types/DbNodeType"
import {seedRelationship} from "../../../../../../../_toolbox/dbSeeding/seedRelationship"
import {getSpecificRelationship} from "../../../../../../../../src/db/relationships/getSpecificRelationship"
import {RelationshipType} from "../../../../../../../../src/db/types/RelationshipType"
import {NodeNotFoundError} from "../../../../../../../../src/models/types/NodeNotFoundError"
import {RelNotFoundError} from "../../../../../../../../src/models/types/RelNotFoundError"

describe('Deleting a ›<%= h.changeCase.kebab(relationshipName) %>‹ relationship', () => {
    test('<%= h.changeCase.upper(startNodeType) %> node does not exist', async () => {
        const <%= h.changeCase.camel(startNodeType) %> = await seedNode(DbNodeType.<%= h.changeCase.pascal(startNodeType) %>)

        await expect(<%= h.changeCase.pascal(startNodeType) %>.delete<%= h.changeCase.pascal(relationshipName) %>Relationship(<%= h.changeCase.camel(startNodeType) %>.properties.id, -43))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('<%= h.changeCase.upper(startNodeType === endNodeType ? 'partner' : endNodeType) %> node does not exist', async () => {
        const <%= h.changeCase.camel(startNodeType === endNodeType ? 'partner' : endNodeType) %> = await seedNode(DbNodeType.<%= h.changeCase.pascal(endNodeType) %>)

        await expect(<%= h.changeCase.pascal(startNodeType) %>.delete<%= h.changeCase.pascal(relationshipName) %>Relationship(-42, <%= h.changeCase.camel(startNodeType === endNodeType ? 'partner' : endNodeType) %>.properties.id))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('<%= h.changeCase.upper(startNodeType) %> node and <%= h.changeCase.upper(startNodeType === endNodeType ? 'partner' : endNodeType) %> node do not exist', async () => {
        await expect(<%= h.changeCase.pascal(startNodeType) %>.delete<%= h.changeCase.pascal(relationshipName) %>Relationship(-42, -43))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('both nodes exist, but have no ›<%= h.changeCase.kebab(relationshipName) %>‹ relationship', async () => {
        const <%= h.changeCase.camel(startNodeType) %> = await seedNode(DbNodeType.<%= h.changeCase.pascal(startNodeType) %>)
        const <%= h.changeCase.camel(startNodeType === endNodeType ? 'partner' : endNodeType) %> = await seedNode(DbNodeType.<%= h.changeCase.pascal(endNodeType) %>)

        await expect(<%= h.changeCase.pascal(startNodeType) %>.delete<%= h.changeCase.pascal(relationshipName) %>Relationship(<%= h.changeCase.camel(startNodeType) %>.properties.id, <%= h.changeCase.camel(startNodeType === endNodeType ? 'partner' : endNodeType) %>.properties.id))
            .rejects
            .toThrow(RelNotFoundError)
    })

    test('both nodes exist and have a ›<%= h.changeCase.kebab(relationshipName) %>‹ relationship', async () => {
        const seededRelationship = await seedRelationship(DbNodeType.<%= h.changeCase.pascal(startNodeType) %>, DbNodeType.<%= h.changeCase.pascal(endNodeType) %>, RelationshipType.<%= h.changeCase.pascal(startNodeType) %><%= h.changeCase.pascal(relationshipName) %>)

        const relationshipBefore = await getSpecificRelationship(
            seededRelationship.start_node.properties.id,
            seededRelationship.end_node.properties.id,
            RelationshipType.<%= h.changeCase.pascal(startNodeType) %><%= h.changeCase.pascal(relationshipName) %>,
        )

        expect(relationshipBefore)
            .toBeTruthy()

        await <%= h.changeCase.pascal(startNodeType) %>.delete<%= h.changeCase.pascal(relationshipName) %>Relationship(seededRelationship.start_node.properties.id, seededRelationship.end_node.properties.id)

        const relationshipAfter = await getSpecificRelationship(
            seededRelationship.start_node.properties.id,
            seededRelationship.end_node.properties.id,
            RelationshipType.<%= h.changeCase.pascal(startNodeType) %><%= h.changeCase.pascal(relationshipName) %>,
        )

        expect(relationshipAfter)
            .toBeFalsy()
    })
})
