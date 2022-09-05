import { API, graphqlOperation } from "aws-amplify";

import { createUser } from "../graphql/mutations";
import getUserFromDatabase from "./getUserFromDatabase";

export default async (user) => {
  if (!user.attributes) return;

  const userFromDatabase = (await getUserFromDatabase(user.attributes.sub)) as {
    data: any;
  };

  if (userFromDatabase?.data?.getUser) return userFromDatabase?.data?.getUser;

  const { data } = (await API.graphql(
    graphqlOperation(createUser, {
      input: {
        id: user.attributes.sub,
        name: user.attributes.name,
        email: user.attributes.email,
        birthdays: [],
      },
    })
  )) as {
    data: any;
  };

  return data.createUser;
};
