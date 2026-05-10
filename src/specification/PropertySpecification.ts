export type PropertySpecification = {
    name: string
    datatype: 'string' | 'number' | 'boolean'
    mandatory: boolean
    scope?: 'user' | 'system'
    example?: string | number | boolean | null
    validation: (
        'mandatory' |
        'string' |
        'number' |
        'imageProvider' |
        'videoProvider' |
        'isValidCountryCode' |
        'isValidCurrencyCode' |
        'isValidIssn')[]
}
