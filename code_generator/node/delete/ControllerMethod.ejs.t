---
inject: true
to: src/controllers/<%= h.changeCase.pascal(nodetype) %>Controller.ts
after: export class <%= h.changeCase.pascal(nodetype) %>Controller
skip_if: await deleteNode
---
    static async delete(req: express.Request, res: express.Response) {
        await deleteNode(req, res)
    }
