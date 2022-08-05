import { ArgsType, Field, Int, ObjectType } from "type-graphql";

@ArgsType()
export class PaginationArgs {
  @Field((type) => Int, { defaultValue: 0 })
  offset!: number;

  @Field((type) => Int)
  take!: number;
}

@ObjectType()
export class Response {
  @Field()
  data: string;
}
