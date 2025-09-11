---
inject: true
to: src/app.ts
before: basicAuthentication
skip_if: import <%= h.changeCase.camel(h.inflection.pluralize(nodeType)) %> from
---
import <%= h.changeCase.camel(h.inflection.pluralize(nodeType)) %> from "./routes/<%= h.changeCase.kebab(h.inflection.pluralize(nodeType)) %>"