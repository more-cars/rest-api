---
inject: true
to: src/controllers/<%= h.changeCase.pascal(startNodeType) %>Controller.ts
after: await get<%= h.changeCase.pascal(relationshipName) %>Relation.*\n
skip_if: static async has<%= h.changeCase.pascal(relationshipName) %>Relation
---
    static async has<%= h.changeCase.pascal(relationshipName) %>Relation(req: express.Request, res: express.Response) {
       await has<%= h.changeCase.pascal(relationshipName) %>Relation(req, res)
    }