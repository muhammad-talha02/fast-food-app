export const appwriteConfig = {
  endpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT,
  projectId: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID,
  platform: "com.cc.fastfood",
  databaseId: process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID,
  usersCollectionId: 'user',

};
