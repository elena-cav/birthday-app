import { API, graphqlOperation } from "aws-amplify";

import { updateUser } from "../graphql/mutations";
import getUserFromDatabase from "./getUserFromDatabase";

export default async (user, newBirthday) => {
  if (!user.attributes) return;

  const userFromDatabase = (await getUserFromDatabase(user.attributes.sub)) as {
    data: any;
  };

  if (!userFromDatabase?.data?.getUser) return;

  const currentBirthdays = userFromDatabase.data.getUser.birthdays;
  try {
    const { data } = (await API.graphql(
      graphqlOperation(updateUser, {
        input: {
          id: user.attributes.sub,
          birthdays: [...currentBirthdays, newBirthday],
        },
      })
    )) as {
      data: any;
    };
    return data.updateUser;
  } catch (e) {
    console.log(e);
  }
};
