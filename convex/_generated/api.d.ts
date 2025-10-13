/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";
import type * as budgets_mutations from "../budgets/mutations.js";
import type * as budgets_queries from "../budgets/queries.js";
import type * as categories_queries from "../categories/queries.js";
import type * as expenses_mutations from "../expenses/mutations.js";
import type * as expenses_queries from "../expenses/queries.js";
import type * as http from "../http.js";
import type * as users_mutations from "../users/mutations.js";
import type * as users_queries from "../users/queries.js";

/**
 * A utility for referencing Convex functions in your app's API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
declare const fullApi: ApiFromModules<{
  "budgets/mutations": typeof budgets_mutations;
  "budgets/queries": typeof budgets_queries;
  "categories/queries": typeof categories_queries;
  "expenses/mutations": typeof expenses_mutations;
  "expenses/queries": typeof expenses_queries;
  http: typeof http;
  "users/mutations": typeof users_mutations;
  "users/queries": typeof users_queries;
}>;
export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;
