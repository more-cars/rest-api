---
inject: true
to: src/models/node-types/<%= h.changeCase.kebab(h.inflection.pluralize(startNodeType)) %>/<%= h.changeCase.pascal(startNodeType) %>.ts
before: \},\n\}
skip_if: async create<%= h.changeCase.pascal(relationshipName) %>Relationship
---
    },

    async create<%= h.changeCase.pascal(relationshipName) %>Relationship(<%= h.changeCase.camel(startNodeType) %>Id: number, <%= h.changeCase.camel(startNodeType === endNodeType ? 'partner' : endNodeType) %>Id: number) {
<% if (startNodeType === endNodeType) { -%>
        if (<%= h.changeCase.camel(startNodeType) %>Id === partnerId) {
            throw new SemanticError(`<%= h.changeCase.title(startNodeType) %> #${<%= h.changeCase.camel(startNodeType) %>Id} cannot be connected to itself`)
        }
<% } -%>
        // checking that both nodes exist -> exception is thrown if not
        await <%= h.changeCase.pascal(startNodeType) %>.findById(<%= h.changeCase.camel(startNodeType) %>Id)
        await <%= h.changeCase.pascal(endNodeType) %>.findById(<%= h.changeCase.camel(startNodeType === endNodeType ? 'partner' : endNodeType) %>Id)

        const existingRelation = await getSpecificRel(<%= h.changeCase.camel(startNodeType) %>Id, <%= h.changeCase.camel(startNodeType === endNodeType ? 'partner' : endNodeType) %>Id, RelType.<%= h.changeCase.pascal(startNodeType) %><%= h.changeCase.pascal(relationshipName) %>)
        if (existingRelation) {
            throw new RelAlreadyExistsError(RelType.<%= h.changeCase.pascal(startNodeType) %><%= h.changeCase.pascal(relationshipName) %>, <%= h.changeCase.camel(startNodeType) %>Id, <%= h.changeCase.camel(startNodeType === endNodeType ? 'partner' : endNodeType) %>Id)
        }
<% if (cardinality === '1:1' || cardinality === 'n:1') { -%>
        await deleteOutgoingRel(<%= h.changeCase.camel(startNodeType) %>Id, RelType.<%= h.changeCase.pascal(startNodeType) %><%= h.changeCase.pascal(relationshipName) %>, ModelNodeType.<%= h.changeCase.pascal(endNodeType) %>)
<% } %>
<% if (cardinality === '1:1' || cardinality === '1:n') { -%>
        await deleteIncomingRel(<%= h.changeCase.camel(startNodeType === endNodeType ? 'partner' : endNodeType) %>Id, RelType.<%= h.changeCase.pascal(startNodeType) %><%= h.changeCase.pascal(relationshipName) %>, ModelNodeType.<%= h.changeCase.pascal(startNodeType) %>)
<% } %>
        const createdRelationship = await createRel(<%= h.changeCase.camel(startNodeType) %>Id, <%= h.changeCase.camel(startNodeType === endNodeType ? 'partner' : endNodeType) %>Id, RelType.<%= h.changeCase.pascal(startNodeType) %><%= h.changeCase.pascal(relationshipName) %>)
        if (!createdRelationship) {
            throw new Error('Relationship could not be created')
        }

        return createdRelationship