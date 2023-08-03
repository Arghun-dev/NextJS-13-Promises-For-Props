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

