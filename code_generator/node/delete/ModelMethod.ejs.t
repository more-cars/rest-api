---
inject: true
to: src/models/<%= h.inflection.pluralize(h.changeCase.kebab(nodetype)) %>/<%= h.changeCase.pascal(nodetype) %>.ts
after: export class <%= h.changeCase.pascal(nodetype) %>
skip_if: static async delete
---
    static async delete(id: number): Promise<boolean> {
        return await deleteNode(id)
    }
