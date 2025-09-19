import { CreateUserPrams, SignInParams } from "@/type";
import {
  Account,
  Avatars,
  Client,
  Databases,
  ID,
  Query,
} from "react-native-appwrite";

export const appwriteConfig = {
  endpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT,
  projectId: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID,
  platform: "com.cc.fastfood",
  databaseId: process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID,
  usersCollectionId: "user",
};

export const client = new Client();

client
  .setEndpoint(appwriteConfig.endpoint!)
  .setProject(appwriteConfig.projectId!)
  .setPlatform(appwriteConfig.platform);

export const account = new Account(client);
console.log({ account });
export const databases = new Databases(client);

export const avatars = new Avatars(client);

export const createUser = async ({
  email,
  password,
  name,
}: CreateUserPrams) => {
  try {
    debugger;
    // const get = await account.get();
    // console.log({ get });
    const newAccount = await account.create({
      userId: ID.unique(),
      email,
      password,
      name,
    });
    if (!newAccount) throw new Error("Failed to create user");
    // const sessionList = await account.listSessions();
    // console.log({ sessionList });
    await signInUser({ email, password });

    const avatarUrl = avatars.getInitialsURL(name);

    const newUser = await databases.createDocument({
      databaseId: appwriteConfig.databaseId!,
      collectionId: appwriteConfig.usersCollectionId!,
      documentId: ID.unique(),
      data: { accountId: newAccount.$id, name, email, avatar: avatarUrl },
    });
    return newUser;
  } catch (error) {
    throw new Error("Error creating user: " + error);
  }
};

export const signInUser = async ({ email, password }: SignInParams) => {
  try {
    const session = await account.createEmailPasswordSession({
      email,
      password,
    });
  } catch (error) {
    throw new Error("Error SignIn user: " + error);
  }
};

export const getCurrentUser = async () => {
  try {
    const currentAccount = await account.get();
    if (!currentAccount) throw new Error("No current account found");
    const currentUser = await databases.listDocuments({
      databaseId: appwriteConfig.databaseId!,
      collectionId: appwriteConfig.usersCollectionId!,
      queries: [Query.equal("accountId", currentAccount.$id)],
    });
    if (!currentUser) throw new Error("No current account found");
    return currentUser?.documents[0];
  } catch (error) {
    throw new Error("Error getting current user: " + error);
  }
};
