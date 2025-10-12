---
inject: true
to: src/models/<%= h.changeCase.kebab(h.inflection.pluralize(startNodeType)) %>/<%= h.changeCase.pascal(startNodeType) %>.ts
before: \}\n\}
skip_if: static async create<%= h.changeCase.pascal(relationshipName) %>Relationship
---
    }

    static async create<%= h.changeCase.pascal(relationshipName) %>Relationship(<%= h.changeCase.camel(startNodeType) %>Id: number, <%= h.changeCase.camel(endNodeType) %>Id: number): Promise<<%= h.changeCase.pascal(startNodeType) %><%= h.changeCase.pascal(relationshipName) %>Relationship> {
        const <%= h.changeCase.camel(startNodeType) %> = await <%= h.changeCase.pascal(startNodeType) %>.findById(<%= h.changeCase.camel(startNodeType) %>Id)
        if (!<%= h.changeCase.camel(startNodeType) %>) {
            throw new NodeNotFoundError(<%= h.changeCase.camel(startNodeType) %>Id)
        }

        const <%= h.changeCase.camel(endNodeType) %> = await <%= h.changeCase.pascal(endNodeType) %>.findById(<%= h.changeCase.camel(endNodeType) %>Id)
        if (!<%= h.changeCase.camel(endNodeType) %>) {
            throw new NodeNotFoundError(<%= h.changeCase.camel(endNodeType) %>Id)
        }

        const existingRelation = await getSpecific<%= h.changeCase.pascal(relationshipName) %>Relationship(<%= h.changeCase.camel(startNodeType) %>Id, <%= h.changeCase.camel(endNodeType) %>Id)
        if (existingRelation) {
            throw new RelationshipAlreadyExistsError(<%= h.changeCase.pascal(startNodeType) %>Relationship.<%= h.changeCase.camel(relationshipName) %>, <%= h.changeCase.camel(startNodeType) %>Id, <%= h.changeCase.camel(endNodeType) %>Id)
        }
<% if (cardinality === '1:1' || cardinality === 'n:1') { %>
        await deleteForeign<%= h.changeCase.pascal(relationshipName) %>Relationship(<%= h.changeCase.camel(endNodeType) %>Id)
<% } %>
        const createdRelationship = await create<%= h.changeCase.pascal(relationshipName) %>Relationship(<%= h.changeCase.camel(startNodeType) %>Id, <%= h.changeCase.camel(endNodeType) %>Id)
        if (!createdRelationship) {
            throw new Error('Relationship could not be created')
        }

        return createdRelationship