import { API, graphqlOperation } from "aws-amplify";

import { updateUser } from "../graphql/mutations";
import getUserFromDatabase from "./getUserFromDatabase";

export default async (userId, birthdayToDelete) => {
  const userFromDatabase = (await getUserFromDatabase(userId)) as {
    data: any;
  };

  if (!userFromDatabase?.data?.getUser) return;

  const currentBirthdays = userFromDatabase.data.getUser.birthdays;
  try {
    const updatedBirthdays = currentBirthdays.filter(
      ({ id }) => id !== birthdayToDelete
    );
    const { data } = (await API.graphql(
      graphqlOperation(updateUser, {
        input: {
          id: userId,
          birthdays: updatedBirthdays,
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
