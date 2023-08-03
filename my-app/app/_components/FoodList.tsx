import { use } from "react";

/**
 * in here, I used 'use' hook
 */

export default function FoodList({
  foodsPromise,
}: {
  foodsPromise: Promise<string[]>;
}) {
  const foods = use(foodsPromise);

  return <div>{foods.join(", ")}</div>;
}
