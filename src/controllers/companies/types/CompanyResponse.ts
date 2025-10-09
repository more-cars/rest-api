export type CompanyResponse = {
    data: {
        id: number

        name: string
        founded: number | null
        defunct: number | null
        headquarters_location: string | null
        legal_headquarters_location: string | null

        created_at: string
        updated_at: string
    }
}
