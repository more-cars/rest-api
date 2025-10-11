---
inject: true
to: src/controllers/<%= h.changeCase.pascal(startNodeType) %>Controller.ts
before: \}\n\}
skip_if: static async getSpecific<%= h.changeCase.pascal(relationshipName) %>Relation
---
    }

    static async getSpecific<%= h.changeCase.pascal(relationshipName) %>Relation(req: express.Request, res: express.Response) {
        await getSpecific<%= h.changeCase.pascal(relationshipName) %>Relation(req, res)