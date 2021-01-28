import * as trpc from '@trpc/server';
import * as z from 'zod';

// The app's context - is typically generated for each request
export type Context = {};
const createContext = ({
  req,
  res,
}: trpc.CreateNextContextOptions): Context => {
  return {};
};

function createRouter() {
  return trpc.router<Context>();
}
const router = createRouter()
  // Create route at path 'hello'
  .query('hello', {
    // using zod schema to validate and infer input values
    input: z
      .object({
        text: z.string().optional(),
      })
      .optional(),
    resolve({ input }) {
      return {
        greeting: `hello ${input?.text ?? 'world'}`,
      };
    },
  })
  .mutation('foo', {
    input: z.object({ bar: z.literal('bar') }),
    async resolve({ input }) {
      // do something with your db

      return {};
    },
  });

// Exporting type _type_ AppRouter only exposes types that can be used for inference
// https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-8.html#type-only-imports-and-export
export type AppRouter = typeof router;

// export API handler
export default trpc.createNextApiHandler({
  router,
  createContext,
});
