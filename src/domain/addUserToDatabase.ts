import { API, graphqlOperation } from "aws-amplify";

import { createUser } from "../graphql/mutations";
import getUserFromDatabase from "./getUserFromDatabase";

export default async (user) => {
  if (!user.attributes) return;

  const userFromDatabase = await getUserFromDatabase(user.attributes.sub);

  if (userFromDatabase?.data?.getUser) return userFromDatabase?.data?.getUser;

  const { data } = await API.graphql(graphqlOperation(createUser, { 
    input: {
      id: user.attributes.sub,
      name: user.attributes.name,
      birthdays: [] 
    }
  }));

  return data.createUser;
}
