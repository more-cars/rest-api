---
to: tests/integration/models/<%= h.inflection.pluralize(h.changeCase.kebab(startNodeType)) %>/relationships/<%= h.changeCase.camel(relationshipName) %>/getSole/nodeDoesNotExist.test.ts
---
import {expect, test} from 'vitest'
import {<%= h.changeCase.pascal(startNodeType) %>} from "../../../../../../../src/models/<%= h.inflection.pluralize(h.changeCase.kebab(startNodeType)) %>/<%= h.changeCase.pascal(startNodeType) %>"
import {NodeNotFoundError} from "../../../../../../../src/models/types/NodeNotFoundError"

test('<%= h.changeCase.upper(startNodeType) %> does not exist', async () => {
    await expect(<%= h.changeCase.pascal(startNodeType) %>.get<%= h.changeCase.pascal(relationshipName) %>Relationship(-42))
        .rejects
        .toThrow(NodeNotFoundError)
})
