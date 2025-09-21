import { CreateUserPrams, GetMenuParams, SignInParams } from "@/type";
import {
  Account,
  Avatars,
  Client,
  Databases,
  ID,
  Query,
  Storage,
} from "react-native-appwrite";

export const appwriteConfig = {
  endpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT,
  projectId: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID,
  platform: "com.cc.fastfood",
  databaseId: process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID || "",
  bucketId: "68cfa3eb000c33c0f434",
  usersCollectionId: "user",
  categoriesCollectionId: "categories",
  menuCollectionId: "menu",
  customizationsCollectionId: "customizations",
  menuCustomizationsCollectionId: "menu_customizations",
};

export const client = new Client();

client
  .setEndpoint(appwriteConfig.endpoint!)
  .setProject(appwriteConfig.projectId!)
  .setPlatform(appwriteConfig.platform);

export const account = new Account(client);

export const databases = new Databases(client);

export const storage = new Storage(client);

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
    console.log({ session });
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



//! Get Categories

export const getCategories = async () => {
  try {
    const categories = await databases.listDocuments({
      databaseId: appwriteConfig.databaseId!,
      collectionId: appwriteConfig.categoriesCollectionId!,
    });
    return categories.documents;
  } catch (error) {
    throw new Error("Error getting categories: " + error);
  }
}
//! Get Menu Items
export const getMenuItems = async ({ category, query }: GetMenuParams) => {
  try {
    const queries: string[] = [];
    if (category) {
      queries.push(Query.equal("categories", category));
    }
    if (query) {
      queries.push(Query.search("name", query));
    }

    const menuItems = await databases.listDocuments({
      databaseId: appwriteConfig.databaseId!,
      collectionId: appwriteConfig.menuCollectionId!,
      queries,
    });
    console.log(JSON.stringify(menuItems?.documents, null, 2));
    return menuItems.documents;
  } catch (error) {
    throw new Error("Error getting menu items: " + error);
  }
};
