export class Recipe {
    public name: string;
    public ingredients: string;
    public directions: string;
    public date: number;

    constructor(name: string, ingredients: string, directions: string, date: number) {
        this.name = name;
        this.ingredients = ingredients;
        this.directions = directions;
        this.date = date;
    }

}