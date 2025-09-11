---
to: src/routes/<%= h.changeCase.kebab(h.inflection.pluralize(nodeType)) %>.ts
---
import express from "express"
import {<%= h.changeCase.pascal(nodeType) %>Controller} from "../controllers/<%= h.changeCase.pascal(nodeType) %>Controller"

const router = express.Router()

router.post('/<%= h.changeCase.kebab(h.inflection.pluralize(nodeType)) %>', <%= h.changeCase.pascal(nodeType) %>Controller.create)

export default router
