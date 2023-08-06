import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/options";
import FoodList from "@/components/FoodList";

/**
 * Why I'm passing promise as prop and not using await to get the data.
 * It's obvious, because I don't want to wait to get the data every time we render this Home component.
 * Which is not great, it ends up blocking the rendering of this application
 * So, any components that are nested within this are going to block on that initial fetch
 */

export default async function Home() {
  const session = await getServerSession(authOptions);

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
      <div className="flex items-center justify-center mt-12">
        {session ? "You are logged in" : "You are not logged in"}
      </div>
    </div>
  );
}
