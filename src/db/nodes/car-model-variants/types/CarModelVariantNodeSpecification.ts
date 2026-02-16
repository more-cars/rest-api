import {NodeSpecification} from "../../../types/NodeSpecification"
import {NodeTypeLabel} from "../../../NodeTypeLabel"

export const CarModelVariantNodeSpecification: NodeSpecification = {
    label: NodeTypeLabel.CarModelVariant,
    properties: [
        {
            name: 'name',
            datatype: 'string',
            mandatory: true,
        },
        {
            name: 'internal_code',
            datatype: 'string',
            mandatory: false,
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
            name: 'body_style',
            datatype: 'string',
            mandatory: false,
        },
        {
            name: 'drag_coefficient',
            datatype: 'number',
            mandatory: false,
        },
        {
            name: 'doors',
            datatype: 'number',
            mandatory: false,
        },
        {
            name: 'weight',
            datatype: 'number',
            mandatory: false,
        },
        {
            name: 'weight_unit',
            datatype: 'string',
            mandatory: false,
        },
        {
            name: 'max_power',
            datatype: 'number',
            mandatory: false,
        },
        {
            name: 'max_power_unit',
            datatype: 'string',
            mandatory: false,
        },
        {
            name: 'max_torque',
            datatype: 'number',
            mandatory: false,
        },
        {
            name: 'max_torque_unit',
            datatype: 'string',
            mandatory: false,
        },
        {
            name: 'cylinders',
            datatype: 'number',
            mandatory: false,
        },
        {
            name: 'engine_configuration',
            datatype: 'string',
            mandatory: false,
        },
        {
            name: 'displacement',
            datatype: 'number',
            mandatory: false,
        },
        {
            name: 'displacement_unit',
            datatype: 'string',
            mandatory: false,
        },
        {
            name: 'air_induction',
            datatype: 'string',
            mandatory: false,
        },
        {
            name: 'engine_type',
            datatype: 'string',
            mandatory: false,
        },
        {
            name: 'energy_source',
            datatype: 'string',
            mandatory: false,
        },
        {
            name: 'energy_source_2',
            datatype: 'string',
            mandatory: false,
        },
        {
            name: 'consumption',
            datatype: 'number',
            mandatory: false,
        },
        {
            name: 'consumption_unit',
            datatype: 'string',
            mandatory: false,
        },
        {
            name: 'consumption_2',
            datatype: 'number',
            mandatory: false,
        },
        {
            name: 'consumption_2_unit',
            datatype: 'string',
            mandatory: false,
        },
        {
            name: 'energy_capacity',
            datatype: 'number',
            mandatory: false,
        },
        {
            name: 'energy_capacity_unit',
            datatype: 'string',
            mandatory: false,
        },
        {
            name: 'energy_capacity_2',
            datatype: 'number',
            mandatory: false,
        },
        {
            name: 'energy_capacity_2_unit',
            datatype: 'string',
            mandatory: false,
        },
        {
            name: 'transmission',
            datatype: 'string',
            mandatory: false,
        },
        {
            name: 'gears',
            datatype: 'number',
            mandatory: false,
        },
        {
            name: 'drivetrain',
            datatype: 'string',
            mandatory: false,
        },
        {
            name: 'sprint_time_0_100_kmh',
            datatype: 'number',
            mandatory: false,
        },
        {
            name: 'top_speed',
            datatype: 'number',
            mandatory: false,
        },
        {
            name: 'top_speed_unit',
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
