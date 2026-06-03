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
import type {PropertySpecification} from "../../specification/PropertySpecification"

export function extractCollectionConstraintParameters(req: express.Request, nodeSpecification: NodeSpecification): NodeCollectionConstraints {
    const systemProperties: PropertySpecification[] = [
        {
            name: 'id',
            datatype: 'number',
            mandatory: true,
            validation: [],
        },
        {
            name: 'created_at',
            datatype: 'string',
            mandatory: true,
            validation: [],
        },
        {
            name: 'updated_at',
            datatype: 'string',
            mandatory: true,
            validation: [],
        }
    ]

    nodeSpecification.properties = nodeSpecification.properties.concat(systemProperties)

    const validProperties = nodeSpecification
        .properties
        .map(prop => prop.name)

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

    const filterByPropertyDataType = nodeSpecification.properties.find(prop => prop.name === filterByProperty)
    const safeFilterValue = !filterByPropertyDataType ? undefined :
        filterByPropertyDataType.datatype === 'number' ? Number(filterValue) :
            filterByPropertyDataType.datatype === 'boolean' ? Boolean(filterValue) :
                filterValue

    const sortByPropertyDataType = nodeSpecification.properties.find(prop => prop.name === sortByProperty)

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
