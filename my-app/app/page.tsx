import FoodList from "@/app/_components/FoodList";

/**
 * Why I'm passing promise as prop and not using await to get the data.
 * It's obvious, because I don't want to wait to get the data every time we render this Home component.
 * Which is not great, it ends up blocking the rendering of this application
 * So, any components that are nested within this are going to block on that initial fetch
 */

export default function Home() {
  // Good
  const foodsRes = fetch("http://localhost:3000/api/foods", {
    cache: "no-cache",
  }).then((res) => res.json());

  // Bad
  // const foodRes = await fetch("http://localhost:3001/api/foods");
  // const foods = await foodRes.json();

  return (
    <div>
      <FoodList foodsPromise={foodsRes} />
      <FoodList foodsPromise={foodsRes} />
      <FoodList foodsPromise={foodsRes} />
      <FoodList foodsPromise={foodsRes} />
      <FoodList foodsPromise={foodsRes} />
      <FoodList foodsPromise={foodsRes} />
    </div>
  );
}
