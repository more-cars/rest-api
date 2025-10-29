---
inject: true
to: src/models/<%= h.changeCase.kebab(h.inflection.pluralize(startNodeType)) %>/<%= h.changeCase.pascal(startNodeType) %>.ts
before: \}\n\}
skip_if: static async create<%= h.changeCase.pascal(relationshipName) %>Relationship
---
    }

    static async create<%= h.changeCase.pascal(relationshipName) %>Relationship(<%= h.changeCase.camel(startNodeType) %>Id: number, <%= h.changeCase.camel(startNodeType === endNodeType ? 'partner' : endNodeType) %>Id: number) {
<% if (startNodeType === endNodeType) { %>
        if (<%= h.changeCase.camel(startNodeType) %>Id === partnerId) {
            throw new SemanticError(`<%= h.changeCase.title(startNodeType) %> #${<%= h.changeCase.camel(startNodeType) %>Id} cannot be connected to itself`)
        }
<% } %>
        const <%= h.changeCase.camel(startNodeType) %> = await <%= h.changeCase.pascal(startNodeType) %>.findById(<%= h.changeCase.camel(startNodeType) %>Id)
        if (!<%= h.changeCase.camel(startNodeType) %>) {
            throw new NodeNotFoundError(<%= h.changeCase.camel(startNodeType) %>Id)
        }

        const <%= h.changeCase.camel(startNodeType === endNodeType ? 'partner' : endNodeType) %> = await <%= h.changeCase.pascal(endNodeType) %>.findById(<%= h.changeCase.camel(startNodeType === endNodeType ? 'partner' : endNodeType) %>Id)
        if (!<%= h.changeCase.camel(startNodeType === endNodeType ? 'partner' : endNodeType) %>) {
            throw new NodeNotFoundError(<%= h.changeCase.camel(startNodeType === endNodeType ? 'partner' : endNodeType) %>Id)
        }

        const existingRelation = await getSpecificRel(<%= h.changeCase.camel(startNodeType) %>Id, <%= h.changeCase.camel(startNodeType === endNodeType ? 'partner' : endNodeType) %>Id, RelationshipType.<%= h.changeCase.pascal(startNodeType) %><%= h.changeCase.pascal(relationshipName) %>)
        if (existingRelation) {
            throw new RelationshipAlreadyExistsError(<%= h.changeCase.pascal(startNodeType) %>Relationship.<%= h.changeCase.camel(relationshipName) %>, <%= h.changeCase.camel(startNodeType) %>Id, <%= h.changeCase.camel(startNodeType === endNodeType ? 'partner' : endNodeType) %>Id)
        }
<% if (cardinality === '1:1' || cardinality === 'n:1') { %>
        await deleteDeprecatedRel(<%= h.changeCase.camel(startNodeType) %>Id, DbRelationship.<%= h.changeCase.pascal(startNodeType) %><%= h.changeCase.pascal(relationshipName) %>, NodeTypeLabel.<%= h.changeCase.pascal(endNodeType) %>)
<% } else if (cardinality === '1:n') { %>
        await deleteDeprecatedRel(<%= h.changeCase.camel(startNodeType === endNodeType ? 'partner' : endNodeType) %>Id, DbRelationship.<%= h.changeCase.pascal(startNodeType) %><%= h.changeCase.pascal(relationshipName) %>, NodeTypeLabel.<%= h.changeCase.pascal(startNodeType) %>)
<% } %>
        const createdRelationship = await createRel(<%= h.changeCase.camel(startNodeType) %>Id, <%= h.changeCase.camel(startNodeType === endNodeType ? 'partner' : endNodeType) %>Id, RelationshipType.<%= h.changeCase.pascal(startNodeType) %><%= h.changeCase.pascal(relationshipName) %>)
        if (!createdRelationship) {
            throw new Error('Relationship could not be created')
        }

        return createdRelationship