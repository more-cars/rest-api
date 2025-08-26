---
inject: true
to: src/models/<%= h.inflection.pluralize(h.changeCase.kebab(startNodeType)) %>/<%= h.changeCase.pascal(startNodeType) %>.ts
after: class
skip_if: static async create<%= h.changeCase.pascal(relationshipName) %>Relationship
---
    static async create<%= h.changeCase.pascal(relationshipName) %>Relationship(<%= h.changeCase.camel(startNodeType) %>Id: number, <%= h.changeCase.camel(endNodeType) %>Id: number): Promise<false | <%= h.changeCase.pascal(startNodeType) %><%= h.changeCase.pascal(relationshipName) %>Relationship> {
        const <%= h.changeCase.camel(startNodeType) %> = await <%= h.changeCase.pascal(startNodeType) %>.findById(<%= h.changeCase.camel(startNodeType) %>Id)
        const <%= h.changeCase.camel(endNodeType) %> = await <%= h.changeCase.pascal(endNodeType) %>.findById(<%= h.changeCase.camel(endNodeType) %>Id)

        if (!<%= h.changeCase.camel(startNodeType) %> || !<%= h.changeCase.camel(endNodeType) %>) {
            return false
        }

        const existingRelation = await get<%= h.changeCase.pascal(relationshipName) %>Relationship(<%= h.changeCase.camel(startNodeType) %>Id, <%= h.changeCase.camel(endNodeType) %>Id)
        if (existingRelation) {
            return existingRelation
        }

        return await create<%= h.changeCase.pascal(relationshipName) %>Relationship(<%= h.changeCase.camel(startNodeType) %>Id, <%= h.changeCase.camel(endNodeType) %>Id)
    }
