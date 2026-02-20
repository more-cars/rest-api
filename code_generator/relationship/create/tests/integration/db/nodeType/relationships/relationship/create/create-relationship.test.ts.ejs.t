---
to: tests/integration/db/<%= h.changeCase.kebab(h.inflection.pluralize(startNodeType)) %>/relationships/<%= h.changeCase.kebab(relationshipName) %>/create/create-relationship.test.ts
---
import {describe, expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {NodeTypeEnum} from "../../../../../../../src/controllers/nodes/types/NodeTypeEnum"
import {createRelationship} from "../../../../../../../src/db/relationships/createRelationship"
import {RelationshipType} from "../../../../../../../src/db/types/RelationshipType"

describe('Creating a ›<%= h.changeCase.kebab(relationshipName) %>‹ relationship', () => {
    test('with valid data', async () => {
        const <%= h.changeCase.camel(startNodeType) %> = await seedNode(NodeTypeEnum.<%= h.changeCase.constant(startNodeType) %>)
        const <%= h.changeCase.camel(startNodeType === endNodeType ? 'partner' : endNodeType) %> = await seedNode(NodeTypeEnum.<%= h.changeCase.constant(endNodeType) %>)

        const createdRelationship = await createRelationship(
            <%= h.changeCase.camel(startNodeType) %>.id,
            <%= h.changeCase.camel(startNodeType === endNodeType ? 'partner' : endNodeType) %>.id,
            RelationshipType.<%= h.changeCase.pascal(startNodeType) %><%= h.changeCase.pascal(relationshipName) %>,
        )

        expect(createdRelationship)
            .toHaveProperty('id')
        expect(createdRelationship)
            .toHaveProperty('type', RelationshipType.<%= h.changeCase.pascal(startNodeType) %><%= h.changeCase.pascal(relationshipName) %>)
        expect(createdRelationship)
            .toHaveProperty('start_node.properties.id', <%= h.changeCase.camel(startNodeType) %>.id)
        expect(createdRelationship)
            .toHaveProperty('end_node.properties.id', <%= h.changeCase.camel(startNodeType === endNodeType ? 'partner' : endNodeType) %>.id)
        expect(createdRelationship)
            .toHaveProperty('created_at')
        expect(createdRelationship)
            .toHaveProperty('updated_at')
    })

    test('with invalid data', async () => {
        const <%= h.changeCase.camel(startNodeType) %> = await seedNode(NodeTypeEnum.<%= h.changeCase.constant(startNodeType) %>)

        const createdRelationship = await createRelationship(
            <%= h.changeCase.camel(startNodeType) %>.id,
            -42,
            RelationshipType.<%= h.changeCase.pascal(startNodeType) %><%= h.changeCase.pascal(relationshipName) %>,
        )

        expect(createdRelationship)
            .toEqual(false)
    })
})
