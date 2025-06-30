export class Category {
    id: number
    name: string
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    constructor(data: any) {
        this.id = data.id
        this.name = data.name
    }
}
