---
to: tests/integration/db/node-types/<%= h.changeCase.kebab(h.inflection.pluralize(startNodeType)) %>/relationships/<%= h.changeCase.kebab(relationshipName) %>/create-relationship.test.ts
---
import {describe, expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../src/db/types/DbNodeType"
import {createRelationship} from "../../../../../../../src/db/relationships/createRelationship"
import {RelationshipType} from "../../../../../../../src/db/types/RelationshipType"

describe('Creating a ›<%= h.changeCase.kebab(relationshipName) %>‹ relationship', () => {
    test('with valid data', async () => {
        const <%= h.changeCase.camel(startNodeType) %> = await seedNode(DbNodeType.<%= h.changeCase.pascal(startNodeType) %>)
        const <%= h.changeCase.camel(startNodeType === endNodeType ? 'partner' : endNodeType) %> = await seedNode(DbNodeType.<%= h.changeCase.pascal(endNodeType) %>)

        const createdRelationship = await createRelationship(
            <%= h.changeCase.camel(startNodeType) %>.properties.id,
            <%= h.changeCase.camel(startNodeType === endNodeType ? 'partner' : endNodeType) %>.properties.id,
            RelationshipType.<%= h.changeCase.pascal(startNodeType) %><%= h.changeCase.pascal(relationshipName) %>,
        )

        expect(createdRelationship)
            .toHaveProperty('id')
        expect(createdRelationship)
            .toHaveProperty('type', RelationshipType.<%= h.changeCase.pascal(startNodeType) %><%= h.changeCase.pascal(relationshipName) %>)
        expect(createdRelationship)
            .toHaveProperty('start_node.properties.id', <%= h.changeCase.camel(startNodeType) %>.properties.id)
        expect(createdRelationship)
            .toHaveProperty('end_node.properties.id', <%= h.changeCase.camel(startNodeType === endNodeType ? 'partner' : endNodeType) %>.properties.id)
        expect(createdRelationship)
            .toHaveProperty('created_at')
        expect(createdRelationship)
            .toHaveProperty('updated_at')
    })

    test('with invalid data', async () => {
        const <%= h.changeCase.camel(startNodeType) %> = await seedNode(DbNodeType.<%= h.changeCase.pascal(startNodeType) %>)

        const createdRelationship = await createRelationship(
            <%= h.changeCase.camel(startNodeType) %>.properties.id,
            -42,
            RelationshipType.<%= h.changeCase.pascal(startNodeType) %><%= h.changeCase.pascal(relationshipName) %>,
        )

        expect(createdRelationship)
            .toEqual(false)
    })
})
