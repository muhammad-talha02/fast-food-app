import { account } from "./appwrite";

export function getImageTypeFromUrl(url: string): string {
  const ext = url.split(".").pop()?.toLowerCase();
  switch (ext) {
    case "jpg":
    case "jpeg":
      return "image/jpeg";
    case "png":
      return "image/png";
    case "gif":
      return "image/gif";
    default:
      return "application/octet-stream"; // fallback
  }
}

  export async function deleteAllUserSessions() {
        try {
            await account.deleteSessions(); // Deletes all sessions for the current user
            console.log('All sessions deleted successfully');
        } catch (error) {
            console.error('Error deleting all sessions:', error);
        }
    }