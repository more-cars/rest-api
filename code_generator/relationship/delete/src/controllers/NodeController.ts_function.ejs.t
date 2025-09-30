---
inject: true
to: src/controllers/<%= h.changeCase.pascal(startNodeType) %>Controller.ts
before: \}\n\}
skip_if: static async delete<%= h.changeCase.pascal(relationshipName) %>Relation
---
    }

    static async delete<%= h.changeCase.pascal(relationshipName) %>Relation(req: express.Request, res: express.Response) {
       await delete<%= h.changeCase.pascal(relationshipName) %>Relation(req, res)