import { API, graphqlOperation } from "aws-amplify";

import { getUser } from "../graphql/queries";

export default async (id) =>
  await API.graphql(
    graphqlOperation(getUser, {
      id,
    })
  );
