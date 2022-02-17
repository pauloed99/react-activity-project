import ActivityGroup from "./activityGroup";

export default interface Activity {
    id: number,
    description: string,
    deliveryDate: string,
    activityGroup : ActivityGroup,
}