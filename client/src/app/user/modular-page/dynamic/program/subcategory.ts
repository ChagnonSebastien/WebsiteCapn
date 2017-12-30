import { Activity } from './activity';

export class Subcategory {

    public activities: Activity[];

    constructor(public name: String) {
        this.activities = [];
    }

    public newActivity(activity: any) {
        this.activities.push(new Activity(
            activity.Name,
            activity.LegacyLocation,
            activity.SpotsRemaining,
            activity.Price
        ));
    }
}
