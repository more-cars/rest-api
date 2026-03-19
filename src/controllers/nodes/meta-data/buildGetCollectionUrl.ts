import {ControllerNodeType} from "../../types/ControllerNodeType"
import type {NodeCollectionConstraints} from "../../../models/types/NodeCollectionConstraints"

export function buildGetCollectionUrl(nodeType: ControllerNodeType, constraints: NodeCollectionConstraints) {
    const urlParams = new URLSearchParams()

    if (constraints.filterByProperty) {
        urlParams.append('filter_by_property', constraints.filterByProperty)
    }

    if (constraints.filterOperator) {
        urlParams.append('filter_operator', constraints.filterOperator)
    }

    if (constraints.filterValue) {
        urlParams.append('filter_value', constraints.filterValue.toString())
    }

    if (constraints.sortByProperty) {
        urlParams.append('sort_by_property', constraints.sortByProperty)
    }

    if (constraints.sortDirection) {
        urlParams.append('sort_direction', constraints.sortDirection)
    }

    if (constraints.page && constraints.page !== 1) {
        urlParams.append('page', constraints.page.toString())
    }

    return urlParams.toString() ? `/${nodeType}?${urlParams.toString()}` : `/${nodeType}`
}
