---
to: src/controllers/<%= h.changeCase.camel(h.inflection.pluralize(startNodeType)) %>/marshalling/marshal<%= h.changeCase.pascal(relationshipName) %>Relationships.ts
---
import {marshal<%= h.changeCase.pascal(relationshipName) %>Relationship} from "./marshal<%= h.changeCase.pascal(relationshipName) %>Relationship"
import {<%= h.changeCase.pascal(startNodeType) %><%= h.changeCase.pascal(relationshipName) %>Relationship} from "../../../models/<%= h.changeCase.kebab(h.inflection.pluralize(startNodeType)) %>/types/<%= h.changeCase.pascal(startNodeType) %><%= h.changeCase.pascal(relationshipName) %>Relationship"

export function marshal<%= h.changeCase.pascal(relationshipName) %>Relationships(relationships: Array<<%= h.changeCase.pascal(startNodeType) %><%= h.changeCase.pascal(relationshipName) %>Relationship>) {
    const responseObjects: Array<<%= h.changeCase.pascal(startNodeType) %><%= h.changeCase.pascal(relationshipName) %>Relationship> = []

    relationships.forEach((relationship) => {
        responseObjects.push(marshal<%= h.changeCase.pascal(relationshipName) %>Relationship(relationship))
    })

    return responseObjects
}
