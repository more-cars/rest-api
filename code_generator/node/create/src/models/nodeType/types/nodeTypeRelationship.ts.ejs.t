---
to: src/models/<%= h.changeCase.kebab(h.inflection.pluralize(nodeType)) %>/types/<%= h.changeCase.pascal(nodeType) %>Relationship.ts
---
export enum <%= h.changeCase.pascal(nodeType) %>Relationship = {
}
