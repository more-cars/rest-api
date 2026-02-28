import {titleize} from "inflection"
import {kebabCase, pascalCase, snakeCase} from "change-case"
import type {NodeType} from "../../../src/specification/NodeType"
import type {ControllerNodeType} from "../../../src/controllers/types/ControllerNodeType"
import type {ModelNodeType} from "../../../src/models/types/ModelNodeType"
import type {DbNodeType} from "../../../src/db/types/DbNodeType"
import type {Neo4jNodeType} from "../../../src/db/types/Neo4jNodeType"

export function convertStringToNodeType(rawNodeType: string) {
    return titleize(rawNodeType) as NodeType
}

export function convertStringToControllerNodeType(rawNodeType: string) {
    return kebabCase(rawNodeType) as ControllerNodeType
}

export function convertStringToModelNodeType(rawNodeType: string) {
    return snakeCase(rawNodeType) as ModelNodeType
}

export function convertStringToDbNodeType(rawNodeType: string) {
    return pascalCase(rawNodeType) as DbNodeType
}

export function convertStringToNeo4jNodeType(rawNodeType: string) {
    return pascalCase(rawNodeType) as Neo4jNodeType
}
