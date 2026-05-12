---
inject: true
to: src/models/node-types/<%= h.changeCase.kebab(h.inflection.pluralize(nodeType)) %>/<%= h.changeCase.pascal(nodeType) %>.ts
before: async delete
skip_if: async update
---
    async update(id: number, data: <%= h.changeCase.pascal(nodeType) %>Input): Promise<<%= h.changeCase.pascal(nodeType) %>Node> {
        const node = await getNodeById(id)

        if (!node) {
            throw new NodeNotFoundError(id)
        }

        const input = convertInputData(data as Create<%= h.changeCase.pascal(nodeType) %>Input)
        const result = await updateDbNode(DbNodeType.<%= h.changeCase.pascal(nodeType) %>, id, input)

        await Revision.create({
            node_type: DbNodeType.<%= h.changeCase.pascal(nodeType) %>,
            node_id: result.properties.id,
            node_created_at: result.properties.created_at,
            node_updated_at: result.properties.updated_at,
            ...result.properties,
        })

        return convertDbNodeToModelNode(result) as <%= h.changeCase.pascal(nodeType) %>Node
    },
