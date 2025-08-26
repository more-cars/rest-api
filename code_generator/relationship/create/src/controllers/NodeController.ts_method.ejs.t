---
inject: true
to: src/controllers/<%= h.changeCase.pascal(startNodeType) %>Controller.ts
after: class
skip_if: static async create<%= h.changeCase.pascal(relationshipName) %>Relation
---
   static async create<%= h.changeCase.pascal(relationshipName) %>Relation(req: express.Request, res: express.Response) {
       await create<%= h.changeCase.pascal(relationshipName) %>Relation(req, res)
   }
