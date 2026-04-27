export type PropertySpecification = {
    name: string
    datatype: 'string' | 'number' | 'boolean'
    mandatory: boolean
    example?: string | number | boolean | null
}
