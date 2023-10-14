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
