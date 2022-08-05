import { Resolver } from "type-graphql";
import { makeResolverClass } from "./utils";

@Resolver()
export class ExampleResolver extends makeResolverClass() {}
