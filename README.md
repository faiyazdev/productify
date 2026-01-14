# TypeScript + Node ESM + Drizzle Import Issue

Maybe you’ve run into this before — I recently ran into a tricky issue when using TypeScript with Node ESM (`moduleResolution: NodeNext`) together with Drizzle. The problem is that Node wants `.js` extensions in relative imports, but Drizzle’s CLI breaks if those `.js` files don’t exist yet because it executes the TypeScript source. Essentially, Node ESM and Drizzle expect incompatible import styles, and TypeScript can’t satisfy both at the same time.

## How I handled it

A practical workaround I found was to **compile the project first** and then let Drizzle operate on the compiled output:

1. Add an `outDir` to your `tsconfig`:

```json
{
  "compilerOptions": {
    "outDir": "./dist"
  }
}
```

2. Update `package.json` scripts to build before running Drizzle:

```json
{
  "scripts": {
    "build": "tsc",
    "db:migrate": "pnpm build && drizzle-kit generate",
    "db:push": "pnpm build && drizzle-kit push"
  }
}
```

3. Point Drizzle to the compiled files in your `dist` folder:

```ts
export default defineConfig({
  schema: "./dist/src/**/*.schema.js",
});
```

This isn’t perfect, and you might need to tweak it depending on your project, but it worked well for me.

For more discussion and context, check out this Reddit thread:
[https://www.reddit.com/r/node/comments/1lltzpq/having_a_headache_with-typescript_node_esm/](https://www.reddit.com/r/node/comments/1lltzpq/having_a-headache-with-typescript_node_esm/)
