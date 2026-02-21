---
inject: true
to: src/models/<%= h.changeCase.kebab(h.inflection.pluralize(nodeType)) %>/<%= h.changeCase.pascal(nodeType) %>.ts
before: \},\n\}
skip_if: async findAll
---
    },

    async findAll(options: NodeCollectionConstraints = {}): Promise<<%= h.changeCase.pascal(nodeType) %>Node[]> {
        const nodes: <%= h.changeCase.pascal(nodeType) %>Node[] = []
        const nodesDb = await getAllNodesOfType(options)

        nodesDb.forEach(node => {
            nodes.push(convert<%= h.changeCase.pascal(nodeType) %>DbNodeToModelNode(node))
        })

        return nodes