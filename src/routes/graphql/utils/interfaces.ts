import { GraphQLType } from "graphql";

export interface iID {
  id: string
}

export interface iUser extends iID {
  name: string
  balance: number
}

// export interface iUserResponse {
//   id: string;
//   name: string;
//   balance: number;
// }

export interface iSchemaField {
  type: GraphQLType;
  args?: Record<string, Record<string, GraphQLType>>;
}

export interface iPost extends iID {
  title: string
  content: string
  authorId: string
}