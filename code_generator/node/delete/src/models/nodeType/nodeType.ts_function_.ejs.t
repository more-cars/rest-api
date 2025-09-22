---
inject: true
to: src/models/<%= h.changeCase.kebab(h.inflection.pluralize(nodeType)) %>/<%= h.changeCase.pascal(nodeType) %>.ts
before: \}\n\}
skip_if: static async delete
---
    }

    static async delete(id: number): Promise<boolean> {
            return await deleteNode(id)