import {NodeSpecification} from "../../../types/NodeSpecification"
import {NodeTypeLabel} from "../../../NodeTypeLabel"

export const CarModelNodeSpecification: NodeSpecification = {
    label: NodeTypeLabel.CarModel,
    properties: [
        {
            name: 'name',
            datatype: 'string',
            mandatory: true,
        },
        {
            name: 'built_from',
            datatype: 'number',
            mandatory: false,
        },
        {
            name: 'built_to',
            datatype: 'number',
            mandatory: false,
        },
        {
            name: 'generation',
            datatype: 'number',
            mandatory: false,
        },
        {
            name: 'internal_code',
            datatype: 'string',
            mandatory: false,
        },
        {
            name: 'total_production',
            datatype: 'number',
            mandatory: false,
        },
    ],
}
