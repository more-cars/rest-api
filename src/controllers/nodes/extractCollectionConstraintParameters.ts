import express from "express"
import type {NodeSpecification} from "../../specification/NodeSpecification"
import type {NodeCollectionConstraints} from "../../models/types/NodeCollectionConstraints"
import {extractPaginationParameter} from "./extractPaginationParameter"
import {extractSortingParameters} from "./extractSortingParameters"
import {extractFilterParameters} from "./extractFilterParameters"
import {isValidPaginationValue} from "../validators/isValidPaginationValue"
import {isValidSortingDirection} from "../validators/isValidSortingDirection"
import {isValidSortingProperty} from "../validators/isValidSortingProperty"
import {isValidFilterProperty} from "../validators/isValidFilterProperty"
import {isValidFilterOperator} from "../validators/isValidFilterOperator"
import {isString} from "../validators/isString"
import {InvalidPaginationParams} from "../../models/types/InvalidPaginationParams"
import {InvalidSortingParams} from "../../models/types/InvalidSortingParams"
import {InvalidFilterParams} from "../../models/types/InvalidFilterParams"

export function extractCollectionConstraintParameters(req: express.Request, nodeProperties: NodeSpecification): NodeCollectionConstraints {
    const validProperties = nodeProperties
        .properties
        .map(prop => prop.name)
        .concat(['id', 'created_at', 'updated_at'])

    const page = extractPaginationParameter(req)
    if (!isValidPaginationValue(page)) {
        throw new InvalidPaginationParams(page)
    }

    const {sortByProperty, sortDirection} = extractSortingParameters(req)
    if (!isValidSortingDirection(sortDirection) ||
        !isValidSortingProperty(sortByProperty, validProperties)) {
        throw new InvalidSortingParams(sortByProperty, sortDirection)
    }

    const {filterByProperty, filterOperator, filterValue} = extractFilterParameters(req)
    if ((filterByProperty === null && filterValue !== null) ||
        (filterByProperty !== null && filterValue === null)
    ) {
        throw new InvalidFilterParams(filterByProperty, filterValue, filterOperator)
    }
    if (!isValidFilterProperty(filterByProperty, validProperties) ||
        !isValidFilterOperator(filterOperator) ||
        !isString(filterValue)) {
        throw new InvalidFilterParams(filterByProperty, filterValue, filterOperator)
    }

    const filterByPropertyDataType = nodeProperties.properties.find(prop => prop.name === filterByProperty)
    const safeFilterValue = !filterByPropertyDataType ? undefined :
        filterByPropertyDataType.datatype === 'number' ? Number(filterValue) :
            filterByPropertyDataType.datatype === 'boolean' ? Boolean(filterValue) :
                filterValue

    const sortByPropertyDataType = nodeProperties.properties.find(prop => prop.name === sortByProperty)

    return {
        page,
        sortByProperty,
        sortByPropertyValuesDatatype: sortByPropertyDataType ? sortByPropertyDataType.datatype : undefined,
        sortDirection,
        filterByProperty,
        filterValue: safeFilterValue,
        filterOperator,
    }
}
