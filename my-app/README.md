# When to use client components and when server components

by default, all components that you define inside app directory, are server components, unless you specify it using 'use client'

Rule of thumb: always use server components, unless you have a specific reason to use a client component.

**What are those specific reasons?**

- If you want to add any interactivity and event listeners such as onclick onchange, ...
- If you want to use (react hooks) or any custom hooks that depends on react hooks
- If you need to access to any browser specific APIs, for example you want to access window object or intersection observer
- If you want to use react class component

# Common patterns when you want to compose your client components and server components together to create your application

- Move your client components as further down as you can to the leaves of your component tree. So, therefore Nextjs can optimize the performance of your application by rendering as much as possible on the server.

For example in the below example

<img width="841" alt="Screenshot 2023-08-03 at 20 06 24" src="https://github.com/Arghun-dev/NextJS-13-Promises-For-Props/assets/53907570/b2b141b1-e542-4ebd-ae4f-6e057109f52d">

as you can see we have search bar which needs to be a client component, it needs client interactivity, instead of turning this whole navbar or the whole layout into a client component, just because this search bar needs interactivity you can abstract the interactivity logic of the search bar into its own client components and then import it inside of your layout, which is a server component.

Now, when composing server and client components. Behind the scene, React is going to render all your server components on the server. It's going to then send the results of your server component s to the client, now during this stage if it encounters any client component is going to skip rending it and it's going to create a little slot for this client component. Once the result is sent to the client side, these client components are going to be rendered, and they're going to just be filled into this slots that was coming from the server. Merging the result of your server render and client render together.

Now, it will be the same, if you're nesting a server component inside of a client component, so your server component is going to be rendered on the server the result is sent to the client, once the client is rendered it's going to then this result of your server component is going to just be plugged into where it needs to be plugged in. And we know already that server components can only be passed in as children to client components. So, you're client component is not aware of what it is, that is going to be rendered inside of it's children, it only knows where exactly these children is supposed to be rendered. But once it actually gets rendered on the client side, it just plugs in whatever that came from the sever side which is the result of your server component and it's going to plug it inside that specific slot that was left for your server component.

Now, as I mentioned already if you want to nest a server component inside a client component you have to pass it as children. **You can not import a server component in a client component, doing so will turn that server component into a client component and if your server component is an async function it's going to throw an error.**

Look at the below example:

```js
"use client";
import { useState } from "react";

// this pattern will **not** work!
// you cannot import a server component into a client component.
import ServerComponent from "./ServerComponent";

export default function ClientComponent({ children }) {
  const [count, setCount] = useState("");

  return (
    <>
      <button onClick={() => setCount((prev) => prev + 1)}>{count}</button>
      <ServerComponent />
    </>
  );
}
```

The above example will not work, because you can not import a server component inside of a client component. **instead you have to pass your server component as a children to your client component**.

So, you're going to refactor your client component to accept a `children`. You're going to have a slot open for any children that's going to be plugged in here. Now, this happens to be a server component, it can also be a client component. So, your parent client component is not even aware of what it is that is going to be rendered here, it just has a slot open for any children that's going to be plugged in here. So the code will be like this:

```js
// This pattern works:
// You can pass a Server Component as a child or prop of a client component.

import ClientComponent from "./ClientComponent";
import ServerComponent from "./ServerComponent";

// Pages in Next.js are server components by default
export default function Page() {
  return (
    <ClientComponent>
      <ServerComponent />
    </ClientComponent>
  );
}
```

This is exactly the same pattern that we're going to actually use to use react-context or to share a global context inside of the app router or within root layout. Because, react-context uses react hooks and react hooks can only be used in client components, so we're going to have a context provider just similar to the above example as a client component and we're going to plug in the rest of our application pages and layouts as server components inside of this context provider so we can share that context throughout our client side components.

**Keep in mind when working with server and client components is whenever you're passing props from a server components to client components that prop or value needs to be serializable, it needs to be able to be converted to a string, because you're crossing the boundry from the server to the client, it has to travel over the network it needs to be converted to a string, so things like function, Date, ... can't be passed in directly that's something to just keep in mind**

So, if you're fetching data on the server side and passing data around in your server components they don't need to be serialized, but any time you're crssing the boundary between the client side and the server side your props need to be serializable.

Now, to keep your server only codes out of your client components and you're writing functions and modules that only meant to run on the server to prevent them from leaking or be called or be imported into client components you can use the `server-only` package from the react team to mark a file or a module as server only code and anytime any function is imported from that file to a client side component it's going to throw a build error.

Example:

`$. npm i server-only`

```js
import "server-only";

export async function getData() {
  const res = await fetch(API);
  return res.json();
}
```

and now if you want to import this `getData` function or any function from this module into a client component, it will throw a build error.
