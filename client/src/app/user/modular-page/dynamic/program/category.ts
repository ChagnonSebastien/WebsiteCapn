import { Subcategory } from './subcategory';

export class Category {

    private subcategories: Map<String, Subcategory>;

    constructor(private name: String) {

    }
}
