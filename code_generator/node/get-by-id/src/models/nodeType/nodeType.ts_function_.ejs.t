---
inject: true
to: src/models/<%= h.changeCase.kebab(h.inflection.pluralize(nodeType)) %>/<%= h.changeCase.pascal(nodeType) %>.ts
before: \},\n\}
skip_if: async findById
---
    },

    async findById(id: number): Promise<false | <%= h.changeCase.pascal(nodeType) %>Node> {
        const node = await getNodeById(id)

        if (!node) {
            return false
        }

        return convertDbNodeToModelNode(node) as <%= h.changeCase.pascal(nodeType) %>Node