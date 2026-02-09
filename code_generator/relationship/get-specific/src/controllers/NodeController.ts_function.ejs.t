---
inject: true
to: src/controllers/<%= h.changeCase.pascal(startNodeType) %>Controller.ts
before: \},\n\}
skip_if: async getSpecific<%= h.changeCase.pascal(relationshipName) %>Relation
---
    },

    async getSpecific<%= h.changeCase.pascal(relationshipName) %>Relation(req: express.Request, res: express.Response) {
        await getSpecific<%= h.changeCase.pascal(relationshipName) %>Relation(req, res)