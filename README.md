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
