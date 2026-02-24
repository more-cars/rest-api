import {NodeType} from "./NodeType"
import {getNodeTypeSpecification} from "./getNodeTypeSpecification"

export function getNamesOfAllNodeProperties(nodeType: NodeType) {
    const nodeSpecs = getNodeTypeSpecification(nodeType)
    const nodePropertiesSpecs = nodeSpecs.properties
    const propertyNames = nodePropertiesSpecs.map(prop => prop.name)

    propertyNames.push('id')
    propertyNames.push('created_at')
    propertyNames.push('updated_at')

    return propertyNames
}
