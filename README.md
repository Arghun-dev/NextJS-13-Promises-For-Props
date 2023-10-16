# NextJS-13

## Server Components

React Server Components (RSC) is a new paradigm introduced in React 18, and Next.js 13 has introduced support for RSC through their app directory.




### SPA

A Single-Page Application works by rendering and data fetching taking place in the browser itself. This results in First Contentful Paint (FCP) taking longer, affecting the user experience.

This is, you did create-react-app, you just built something like react-router, you just have one index.html page in the browser and every time you do routing you just switching out that `div` to another component, but the html page never goes back to the server or reloads or refetches, it's just a single page that switches the components based of the router.

And this is really cool, it was quick, routing is fast you don't have to worry about having a server you can put it on the CDN, ...

But it has problems, the browser has to download all the javascript in order for the people to see things, not only see things but also interact with those things

You also have problems with `crawlers` Because those crawlers don't know how to deal with javascript.

So, to address that, `server-side rendering` came out.





### SSR

In contrast, SSR, , mitigates these issues by rendering the initial page in the server itself, reducing the time taken for FCP and vastly improving the user experience. However, the page will not become interactive immediately, and the browser needs to wait till it completes downloading the JavaScript bundle to add interactivity.

So, it's kind of the same thing (SPA) but with a different first step, instead of rendering everything on the browser, instead initial render of that page of that component happens on the server, so we're gonna take that component, render it's html, send that html to the browser which shows up instantly `without` any javascript downloaded. And the while that it's being shown in the background browser downloads javascript, and the it have the client version of the same component take over which alows `interactivity`, that swap happens so fast so you don't see it. So, that way people can see the page immediately, crawlers can get the information they want immediately, but you still have to wait for the javascript to be downloaded in order to be `interactive`.

So, we solved the problems to see things quickly and also we solved the SEO problem for crawlers.

But we didn't solve the problem of what if I wanna to click on the `form` component like button as soon as I see it. You can't, you need to wait for the javascript to be downloaded.

Depending on the internet connection, how big is the javascript file is, it can take quite a long time.

Then people got very fancy with like we'll do `code-spilitting` so we split the bundle up and then we'll do `dynamic import` so we only import code that we need.

`But`, are we really solving the problem here? 

So, now this brings us to `React Server Components`




### RSC

RSC is a new way of doing server-side rendering by allowing developers to write components that run on the server and stream their output to the client.

In RSC, there are two types of components: `server components` which can be rendered on the server, and client components, which are rendered on the browser. Server components can be defined as any component that doesn't involve user interactivity like a mouse click or keyboard input or use React hooks like the useState hook and the useEffect hook.

Ther server can render these components and stream them to the browser. The server needs to send the JavaScript code to render only the client components, so the javascript bundle size is going to be a lot smaller and faster to download. This means that the user interface can become interactive faster reducing `TTI`

`Overall`: it's almost like `server-side-rendering` except for the fact that, there's no javascript with the component that sent to the browser, so you can basically run react-server-component entirely without any javascript at all.

But the caveat is, you can't have any interactivity with this component either. You still need client-components for that.

But, by having this server component,  it allows us to do like, all the data fetching necessary for a page, imagine a blog page that needs to get the content from a `CMS` you can do that on the server while the component is rendering and send that back to the client without any javascript added to it, so there's no need for the entire bundle of the javascript to download.

**So only the specific components that needs interaction like a form component, only that component could be a client component.**



### RSC vs. SSR

In contrast, SSR performs server-side rendering only during the initial page load. This means that other than the initial components, all other components are rendered in the browser when SSR is used. So, the browser has to download the JavaScript for the whole app just like in a Single-Page Applications. This makes RSC mode efficient than SSR in terms of performance and user experience.

This makes the client-side bundle `predictable` and `cachable` which is really hard to when bundle sizes always changing, now you don't have to worry about it changing when you add new pages, because those pages don't contribute to the bundle size because they are server components.



### Routing

**Tip1: You need export `default` your page component. Otherwise it will not wrok**

**Tip2: Route grouping like (dashboard) will not affect the url path. `(dashboard)/settings/page.tsx` => `/settings`**

Next.js also offers special files to provide unique behaviour to routes, like `layout.tsx` for shared layout among routes, `loading.tsx` for loading state, and `error.tsx` for error handling. These allow you to design comprehensive user experiences with clear feedback mechanisms.

**Tip3: Advanced Routing -> Parallel Routing and Intercepting Routing**


### Dynamic Routes

1. Single dynamic route `/blog/1`, `/blog/2`

`blog/[id]/page.tsx`:

```js
interface BlogPageProps {
  params: {
    id: string;
  }
}

const BlogPage = ({ params }) => {
  return <div>Blog for: {params.id}</div>
}
```


2. Catch all dynamic routes `excluding` /blog

`blog/[...id]/page.tsx`

```js
interface BlogPageProps {
  params: {
    id: string[];
  }
}

const BlogPage = ({ params }) => {
  return <div>Blog for: {params.id.toString()}</div>
}
```


3. Catch all dynamic routes `including` /blog

`blog/[[...id]]/page.tsx`

```js
interface BlogPageProps {
  params: {
    id: string[];
  }
}

const BlogPage = ({ params }) => {
  return <div>Blog for: {params.id.join(',')}</div>
}
```

To further optimize the dynamic routes, Next.js introduces a `generateStaticParams` function, used in combination with dynamic route segments, to generate routes statically at `build time`. This provides the advantage of faster page load times as pages are prerendered and ready to serve, bypassing any real-time computation or data fetching.



## Rendering

In Next.js, routes can be statically or dynamically rendered. Static routes render the components on the server ay build time and cahce the result for future requests, while dynamic routes render the components on the server at request time.

By default, Next.js `statically` renders routes to improve performance and cahces the result of `fetch()` requests that do not specifically opt out of caching behaviour. If any fetch requests in the route use the revalidate option, the route will be re-rendered statically during revalidation.

During static rendering, is a dynamic function or a dynamic `fetch()` request (no caching) is discovered, Next.js will switch to dynamically rendering the whole route at request time. Any cached data requests can still be re-used during dynamic rendering.

Dynamic functions rely on information that can only known at request time such as a user's cookies, current request headers, or the URL's search params. Using `cookies()` or `headers()` in a Server Component will opt the whole route into dynamic rendering at request time, while using `useSearchParams()` in Client Components will skip static rendering and instead render all Client Components up to the nearest parent Suspense boundry on the client.

Dynamic data fetches are `fetch()` requests that specifically opt out of caching behavour by setting the cache option to `no-store` or revalidate to 0.


## Layouts and Templates

### Layouts

Layouts are components that are shared between different pages. They wrap a page. Useful for common UI elements like navigation components. Layouts are only rendered once, they don't re-render on route changes. To create a layout, it's similar to pages, except creating a page.js you create a `layout.tsx`


### Templates

Templates are the exact same as Layouts, except they do `re-render` every time a route changes. This is useful for things like enter and exit animations and useEffect logic that happens on render.

You just need to create `template.tsx`

You will almost never use it :)

You will only if want to animate something in or out whenever route changes you will use it. Or if you specifically need your layout to re-render.


## Fetching Data

### Server Components

They only execute on the server, you can do `Node` things inside server components.

Server components fetch data on the server. Because these components have not client side JS, they don't fall into the render logic / loop that client components do and instead they work more like regualr js functions. This means we can just async / await a server component to get data.

```js
const getContent = async () => {
  const res = await fetch('...')
  const content = await res.json()
  return content.homePage
}
```


### Client Component

You just need to add `use client` at the top of the component => always use server component unless you need to use browser client features and you need to have user interactions like onclick.

```js
'use client'
import { useState } from 'react';

const NewTodoForm = () => {
  const [state, updateState] = useState('');
  ...
}

export default NewTodoForm;
```

It's exactly like react components. But you need to consider couple of important things:

1. It's normal react client side component, But that doesn't mean that it won't server side render. It still server side render.

For example if you run this code:

```js
'use client'
import { useState } from 'react';

const NewTodoForm = () => {
  console.log("test")
  const [state, updateState] = useState('');
  ...
}

export default NewTodoForm;
```

You will see the log of `test` will both logs on the server and also on the client. Why?

Because, even though it's a client component, it still renders on the server, that's because there's a difference between server side rendering and react server component, by default Next.js is going to render everything on the server even this client component.

Even in this client compoent we can't just run `console.log(window.localStorage)` we first need to check if we're on the client or not like this:

```js
'use client'
import { useState } from 'react';

const NewTodoForm = () => {
  const [state, updateState] = useState('');

  useEffect(() => {
    console.log(window.localStorage);
  }, [])

  ...
}

export default NewTodoForm;
```

You can't also pass a prop between client and server component which is `not serializable`

Why? => Because that communication needs to go across the barrier it has to go through the network and going to through the network it needs to be serialized.

**serializable means that you can run `JSON.stringify()` on that prop you pass**

You can't serialize a `function`, `Date`, ...


## Server Actinos

Server actinos allow us to run code on the server without ever having to setup a new API route ourselves. Depending on how you use a server action, they might work with JS disabled on the browser. Here's how to create a Server Actions.

Server actions is actually running code on the server.

So what is the difference of it with API endpoint? 

- Well, what if you don't have to setup the route yourself, what if that it's setup for you, `you could just call a function, that get's executed on the server, that's basically what server action is, your ability to call a function that gets executed on the server. You don't have to setup API route your self, you don't have to worry about that.`

- And depending on when you use that action, you can actually trigger it without actually using JavaScript in the case like `forms` => So, that means you can have pretty interactive app without any javascript on it.


How to create a server action?

If you are in a component:
  - All you need to do to make a function and use the `use server` directive at the top of that function or in a file that uses the directive at the top, and then you can use that function almost any where
  - You can do whatever you want in a server action, however, you can't wait for a response to get a return value. This is why server actions are great for performing side effects or any action in which the client isn't waiting for a response.
  - If you must perform a mutation in your server action, as in you change some data and need that change to be reflected on the screen, you can use `revalidate` to tell Next.js to fetch the data again for that given path:
  ```js
    const newTodo = async (data) => {
      'use server'
      const todo = data.get('todo');
      await db.todo.create(todo);
      revalidate('/todos') // fetch data again on /todos page
    }
  ```
  

```js
const Home = async () => {
  const update = async (data) => {
    'use server'
    const email = data.get('email')
    // ...
  }

  return (
    <form>
      <input name="email" type="email" />
      <button type="submit">Sign Up</button>
    </form>
  )
}
```

There are other ways to use a server action outside of a form action as well. However, right now, I recommend only using server actions for forms that trigger non mutations on the server.

The clean to write you server actions

create a file of `actions.ts` inside of your `utils` and on top define the directive of `use server` so guarantee that these function are going to be run on the server.

actions.ts

```js
'use server'
import db from '@/utils/db';

const createNewTodo = async (formData) => {
  const todo = await db.todo.create({
    data: {
      content: formData.get('content')
    }
  })
}
```

**IMPORTANT:** The only problem with server actions, unlike API calls where you can make http requests and get the `response` back from the request. Here, you `can't` responde back. So that's very big disadvantage of that.

So, that's why server action is really good for `side effects`, side effect is basically, like if you've ever done analytics, every time you call track, that's a side effect. The app doesn't depend on you calling analytics, it's happening in the background, as the person navigates through the app, you're not sitting and waiting showing a loading spinner to finish it's track, it's just happening on the side, it's a side effect. So, server actions are great for side effects. Things, that have to happen on the server and which the UI and user doesn't need to wait for. Maybe you have some event driven architecture that's handled by web hooks, you can just fire this, that fires web hook, ... 

But if you need to change some data on the backend and you need a response back from it, right now it's just better to do it on the client. You should just make an API call from the frontend.

After you create your todo if you want to check your database you can run this code:

`$ > npx prisma studio`

Now after I created new todo, how to re-fetch new todos:

actions.ts

```js
'use server'

import { revalidatePath } from 'next/cache';
import db from './db';

export const createTodo = async (formData) => {
  const todo = await db.todo.creare({
    data: {
      content: formData.get('content')
    }
  })

  revalidatePath('/todos')
}
```

it's something like soft refresh. It's not refreshing the page, but it's gonna expire the cache of that page and eforces that to re-fetch the data.
