---
to: tests/integration/models/<%= h.changeCase.kebab(h.inflection.pluralize(startNodeType)) %>/relationships/<%= h.changeCase.camel(relationshipName) %>/getSpecific/nodesDontExist.test.ts
---
import {describe, expect, test} from 'vitest'
import {seed<%= h.changeCase.pascal(endNodeType) %>} from "../../../../../../_toolbox/dbSeeding/<%= h.changeCase.kebab(h.inflection.pluralize(endNodeType)) %>/nodes/seed<%= h.changeCase.pascal(endNodeType) %>"
import {seed<%= h.changeCase.pascal(startNodeType) %>} from "../../../../../../_toolbox/dbSeeding/<%= h.changeCase.kebab(h.inflection.pluralize(startNodeType)) %>/nodes/seed<%= h.changeCase.pascal(startNodeType) %>"
import {<%= h.changeCase.pascal(startNodeType) %>} from "../../../../../../../src/models/<%= h.changeCase.kebab(h.inflection.pluralize(startNodeType)) %>/<%= h.changeCase.pascal(startNodeType) %>"
import {NodeNotFoundError} from "../../../../../../../src/models/types/NodeNotFoundError"

describe('Requesting a specific ›<%= h.changeCase.kebab(relationshipName) %>‹ relationship', () => {
    test('with a <%= h.changeCase.upper(startNodeType) %> that does not exist', async () => {
        const <%= h.changeCase.camel(endNodeType) %> = await seed<%= h.changeCase.pascal(endNodeType) %>()

        await expect(<%= h.changeCase.pascal(startNodeType) %>.getSpecific<%= h.changeCase.pascal(relationshipName) %>Relationship(-42, <%= h.changeCase.camel(endNodeType) %>.id))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('with an <%= h.changeCase.upper(endNodeType) %> that does not exist', async () => {
        const <%= h.changeCase.camel(startNodeType) %> = await seed<%= h.changeCase.pascal(startNodeType) %>()

        await expect(<%= h.changeCase.pascal(startNodeType) %>.getSpecific<%= h.changeCase.pascal(relationshipName) %>Relationship(<%= h.changeCase.camel(startNodeType) %>.id, -43))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('with a <%= h.changeCase.upper(startNodeType) %> and <%= h.changeCase.upper(endNodeType) %> that do not exist', async () => {
        await expect(<%= h.changeCase.pascal(startNodeType) %>.getSpecific<%= h.changeCase.pascal(relationshipName) %>Relationship(-42, -43))
            .rejects
            .toThrow(NodeNotFoundError)
    })
})
