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
