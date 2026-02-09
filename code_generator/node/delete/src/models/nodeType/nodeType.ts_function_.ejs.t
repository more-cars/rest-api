---
inject: true
to: src/models/<%= h.changeCase.kebab(h.inflection.pluralize(nodeType)) %>/<%= h.changeCase.pascal(nodeType) %>.ts
before: \},\n\}
skip_if: async delete
---
    },

    async delete(<%= h.changeCase.camel(nodeType) %>Id: number): Promise<void> {
        const node = await <%= h.changeCase.pascal(nodeType) %>.findById(<%= h.changeCase.camel(nodeType) %>Id)
        if (!node) {
            throw new NodeNotFoundError(<%= h.changeCase.camel(nodeType) %>Id)
        }

        await deleteNode(<%= h.changeCase.camel(nodeType) %>Id)