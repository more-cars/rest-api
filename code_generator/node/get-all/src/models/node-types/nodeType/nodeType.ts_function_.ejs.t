---
inject: true
to: src/models/node-types/<%= h.changeCase.kebab(h.inflection.pluralize(nodeType)) %>/<%= h.changeCase.pascal(nodeType) %>.ts
before: \},\n\}
skip_if: async findAll
---
    },

    async findAll(options: NodeCollectionConstraints = {}): Promise<<%= h.changeCase.pascal(nodeType) %>Node[]> {
        const nodes: <%= h.changeCase.pascal(nodeType) %>Node[] = []
        const nodesDb = await getAllNodesOfType(options)

        nodesDb.forEach(node => {
            nodes.push(convertDbNodeToModelNode(node) as <%= h.changeCase.pascal(nodeType) %>Node)
        })

        return nodes