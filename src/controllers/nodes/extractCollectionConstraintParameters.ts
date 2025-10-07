import express from "express"
import {extractPaginationParameter} from "./extractPaginationParameter"
import {extractSortingParameters} from "./extractSortingParameters"
import {extractFilterParameters} from "./extractFilterParameters"
import {isValidPaginationValue} from "../validators/isValidPaginationValue"
import {isValidSortingDirection} from "../validators/isValidSortingDirection"
import {isValidSortingProperty} from "../validators/isValidSortingProperty"
import {isValidFilterProperty} from "../validators/isValidFilterProperty"
import {isValidFilterOperator} from "../validators/isValidFilterOperator"
import {isOptionalString} from "../validators/isOptionalString"
import {InvalidPaginationParams} from "../../models/types/InvalidPaginationParams"
import {InvalidSortingParams} from "../../models/types/InvalidSortingParams"
import {InvalidFilterParams} from "../../models/types/InvalidFilterParams"
import type {NodeCollectionConstraints} from "../../models/types/NodeCollectionConstraints"

export function extractCollectionConstraintParameters(req: express.Request, nodeProperties: string[]): NodeCollectionConstraints {
    const page = extractPaginationParameter(req)
    if (!isValidPaginationValue(page)) {
        throw new InvalidPaginationParams(page)
    }

    const {sortByProperty, sortDirection} = extractSortingParameters(req)
    if (!isValidSortingDirection(sortDirection) || !isValidSortingProperty(sortByProperty, nodeProperties)) {
        throw new InvalidSortingParams(sortByProperty, sortDirection)
    }

    const {filterByProperty, filterValue, filterOperator} = extractFilterParameters(req)
    if (filterByProperty && !filterValue || !filterByProperty && filterValue) {
        throw new InvalidFilterParams(filterByProperty, filterValue, filterOperator)
    }
    if (!isOptionalString(filterValue) || !isValidFilterOperator(filterOperator) || !isValidFilterProperty(filterByProperty, nodeProperties)) {
        throw new InvalidFilterParams(filterByProperty, filterValue, filterOperator)
    }

    return {
        page,
        sortByProperty,
        sortDirection,
        filterByProperty,
        filterValue, // TODO parse as number, boolean or string (depending on the data type of the property)
        filterOperator,
    }
}
