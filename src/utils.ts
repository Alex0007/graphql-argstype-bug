import { Resolver, Query, Args } from "type-graphql";
import { PaginationArgs, Response } from "./object-types";

export function makeResolverClass() {
  @Resolver((of) => Response, { isAbstract: true })
  abstract class ExampleResolver {
    @Query((returns) => Response)
    async exampleQuery(@Args() args: PaginationArgs): Promise<Response> {
      return {
        data: "first resolver",
      };
    }
  }

  return ExampleResolver;
}
