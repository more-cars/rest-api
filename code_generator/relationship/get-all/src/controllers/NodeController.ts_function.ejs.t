---
inject: true
to: src/controllers/<%= h.changeCase.pascal(startNodeType) %>Controller.ts
before: \}\n\}
skip_if: static async getAll<%= h.changeCase.pascal(relationshipName) %>Relations
---
    }

    static async getAll<%= h.changeCase.pascal(relationshipName) %>Relations(req: express.Request, res: express.Response) {
        await getAll<%= h.changeCase.pascal(relationshipName) %>Relations(req, res)