---
inject: true
to: src/routes/registerNodeTypeRoutes.ts
before: images\)
skip_if: <%= h.changeCase.camel(h.inflection.pluralize(nodeType)) %>\)
---
    app.use('/', <%= h.changeCase.camel(h.inflection.pluralize(nodeType)) %>)