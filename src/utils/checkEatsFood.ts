import { Coordinates } from "../types/types";

export const checkEatsFood = (head: Coordinates, food: Coordinates, area: number): boolean => {
    const distanceBetweenFoodSnakeX: number = Math.abs(head.x - food.x);
    const distanceBetweenFoodSnakeY: number = Math.abs(head.y - food.y);
    return(
        distanceBetweenFoodSnakeX < area &&
        distanceBetweenFoodSnakeY < area
    )
}