export class Recipe {
    public id: number;
    public name: string;
    public ingredients: string;
    public directions: string;
    public date: number;

    constructor(id: number, name: string, ingredients: string, directions: string, date: number) {
        this.id = id;
        this.name = name;
        this.ingredients = ingredients;
        this.directions = directions;
        this.date = date;
    }

}