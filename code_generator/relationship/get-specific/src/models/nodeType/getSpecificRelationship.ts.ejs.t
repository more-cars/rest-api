---
from: create/src/models/nodeType/getSpecificRelationship.ts.ejs.t
to: src/models/<%= h.changeCase.kebab(h.inflection.pluralize(startNodeType)) %>/getSpecific<%= h.changeCase.pascal(relationshipName) %>Relationship.ts
---
