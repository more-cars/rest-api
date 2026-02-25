---
to: src/routes/node-types/<%= h.changeCase.kebab(h.inflection.pluralize(nodeType)) %>.ts
---
import express from "express"
import {<%= h.changeCase.pascal(nodeType) %>Controller} from "../../controllers/node-types/<%= h.changeCase.pascal(nodeType) %>Controller"

const router = express.Router()

router.post('/<%= h.changeCase.kebab(h.inflection.pluralize(nodeType)) %>', <%= h.changeCase.pascal(nodeType) %>Controller.create)

export default router
