import { API, graphqlOperation } from "aws-amplify";

import { updateUser } from "../graphql/mutations";
import getUserFromDatabase from "./getUserFromDatabase";

export default async (user, newBirthday) => {
  if (!user.attributes) return;

  const userFromDatabase = await getUserFromDatabase(user.attributes.sub);

  if (userFromDatabase?.data?.getUser) return;

  const currentBirthdays = userFromDatabase.data.getUser.birthdays;

  const { data } = await API.graphql(graphqlOperation(updateUser, { 
    input: {
      id: user.attributes.sub,
      birthdays: [...currentBirthdays, newBirthday] 
    }
  }));

  console.log('update bdays', data)

  return data.updateUser;
}
