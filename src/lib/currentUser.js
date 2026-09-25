import { currentUser } from "@clerk/nextjs/server";
import { db } from "./db";

export async function createOrUpdateCurrentUser() {
  const user = await currentUser();

  if (!user) return null;

  const dbUser = await db.user.upsert({
    where: { id: user.id },
    update: {
      email: user.emailAddresses[0]?.emailAddress,
      name: `${user.firstName || ""} ${user.lastName || ""}`,
      avatar: user.imageUrl,
    },
    create: {
      id: user.id,
      email: user.emailAddresses[0]?.emailAddress,
      name: `${user.firstName || ""} ${user.lastName || ""}`,
      avatar: user.imageUrl,
    },
  });

  return dbUser;
}
