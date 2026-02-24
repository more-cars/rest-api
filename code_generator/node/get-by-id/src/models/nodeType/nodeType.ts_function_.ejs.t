---
inject: true
to: src/models/node-types/<%= h.changeCase.kebab(h.inflection.pluralize(nodeType)) %>/<%= h.changeCase.pascal(nodeType) %>.ts
before: \},\n\}
skip_if: async findById
---
    },

    async findById(id: number): Promise<<%= h.changeCase.pascal(nodeType) %>Node> {
        const node = await getNodeById(id)

        if (!node) {
            throw new NodeNotFoundError(id)
        }

        return convertDbNodeToModelNode(node) as <%= h.changeCase.pascal(nodeType) %>Node