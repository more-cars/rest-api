---
inject: true
to: tests/_toolbox/schemas/response/getResponseNodeSchema.ts
before: import {ImageSchema} from
skip_if: import {<%= h.changeCase.pascal(nodeType) %>Schema} from
---
import {<%= h.changeCase.pascal(nodeType) %>Schema} from "./<%= h.changeCase.pascal(nodeType) %>Schema"