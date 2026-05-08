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

        const input = convertInputData(data as CreateCompanyInput)
        const result = await updateDbNode(DbNodeType.<%= h.changeCase.pascal(nodeType) %>, id, input)

        return convertDbNodeToModelNode(result) as <%= h.changeCase.pascal(nodeType) %>Node
    },
