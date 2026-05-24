---
inject: true
to: src/routes/registerNodeTypeRoutes.ts
before: import images
skip_if: import <%= h.changeCase.camel(h.inflection.pluralize(nodeType)) %> from
---
import <%= h.changeCase.camel(h.inflection.pluralize(nodeType)) %> from "./node-types/<%= h.changeCase.kebab(h.inflection.pluralize(nodeType)) %>"