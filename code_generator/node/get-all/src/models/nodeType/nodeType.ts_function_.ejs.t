---
inject: true
to: src/models/<%= h.changeCase.kebab(h.inflection.pluralize(nodeType)) %>/<%= h.changeCase.pascal(nodeType) %>.ts
before: \}\n\}
skip_if: static async findAll
---
    }

    static async findAll(): Promise<<%= h.changeCase.pascal(nodeType) %>Node[]> {
        const nodes: Array<<%= h.changeCase.pascal(nodeType) %>Node> = []
        const nodesDb = await getAllNodesOfType()

        nodesDb.forEach(node => {
            nodes.push(convertOutputData(node))
        })

        return nodes