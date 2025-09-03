---
inject: true
to: src/controllers/<%= h.changeCase.pascal(startNodeType) %>Controller.ts
after: await create<%= h.changeCase.pascal(relationshipName) %>Relation.*\n
skip_if: static async get<%= h.changeCase.pascal(relationshipName) %>Relation
---
    static async get<%= h.changeCase.pascal(relationshipName) %>Relation(req: express.Request, res: express.Response) {
       await get<%= h.changeCase.pascal(relationshipName) %>Relation(req, res)
    }