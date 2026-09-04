import { auth } from "@/app/auth";
import { prisma } from "@/shared/lib/prisma";

import { AddPasskeyModal } from "./add-passkey-modal";

export async function AddPasskeyButton() {
  const session = await auth();
  const email = session?.user?.email;
  if (!email) return null;

  const hasPasskey =
    (await prisma.authenticator.count({
      where: { user: { email } },
    })) > 0;

  if (hasPasskey) return null;

  return <AddPasskeyModal />;
}
