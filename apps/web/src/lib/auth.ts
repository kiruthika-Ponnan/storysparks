import { auth } from "./auth-config";

export const getCurrentUser = async () => {
  const session = await auth();
  
  if (!session?.user) {
    throw new Error("Not authenticated");
  }
  
  return {
    id: session.user.id,
    email: session.user.email!,
    name: session.user.name || session.user.email!,
  };
};
