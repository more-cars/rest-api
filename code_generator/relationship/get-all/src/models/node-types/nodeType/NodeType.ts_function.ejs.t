---
inject: true
to: src/models/node-types/<%= h.changeCase.kebab(h.inflection.pluralize(startNodeType)) %>/<%= h.changeCase.pascal(startNodeType) %>.ts
before: \},\n\}
skip_if: async getAll<%= h.changeCase.pascal(relationshipName) %>Relationships
---
    },

    async getAll<%= h.changeCase.pascal(relationshipName) %>Relationships(<%= h.changeCase.camel(startNodeType) %>Id: number) {
        // checking that the node exists -> exception is thrown if not
        await <%= h.changeCase.pascal(startNodeType) %>.findById(<%= h.changeCase.camel(startNodeType) %>Id)

        return getAllRels(<%= h.changeCase.camel(startNodeType) %>Id, RelType.<%= h.changeCase.pascal(startNodeType) %><%= h.changeCase.pascal(relationshipName) %>)