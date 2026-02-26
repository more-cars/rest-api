---
inject: true
to: src/app.ts
before: import images
skip_if: import <%= h.changeCase.camel(h.inflection.pluralize(nodeType)) %> from
---
import <%= h.changeCase.camel(h.inflection.pluralize(nodeType)) %> from "./routes/node-types/<%= h.changeCase.kebab(h.inflection.pluralize(nodeType)) %>"