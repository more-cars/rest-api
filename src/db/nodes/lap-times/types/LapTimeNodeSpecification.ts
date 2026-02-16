import {NodeSpecification} from "../../../types/NodeSpecification"
import {NodeTypeLabel} from "../../../NodeTypeLabel"

export const LapTimeNodeSpecification: NodeSpecification = {
    label: NodeTypeLabel.LapTime,
    properties: [
        {
            name: 'time',
            datatype: 'string',
            mandatory: true,
        },
        {
            name: 'driver_name',
            datatype: 'string',
            mandatory: true,
        },
        {
            name: 'date',
            datatype: 'string',
            mandatory: false,
        },
    ],
}
