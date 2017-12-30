import { Subcategory } from './subcategory';

export class Category {

    public subcategories: Subcategory[];

    constructor(public name: String) {
        this.subcategories = [];
    }

    public newItem(activity: any) {
        let targetSubcategory = this.getSubcategory(activity.SubCategoryName)[0];
        if (targetSubcategory === undefined) {
            targetSubcategory = new Subcategory(activity.SubCategoryName);
            this.subcategories.push(targetSubcategory);
        }
        targetSubcategory.newActivity(activity);
    }

    private getSubcategory(name: String): Subcategory[] {
      return this.subcategories.filter((subcategory: Subcategory) => {
        return subcategory.name === name;
      });
    }
}
