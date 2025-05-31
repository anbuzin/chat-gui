// app/auth/[...auth]/route.ts

import { redirect } from "next/navigation";
import { auth, client } from "@/lib/auth";

const { GET, POST } = auth.createAuthRouteHandlers({
  async onBuiltinUICallback({ error, tokenData, isSignUp }) {
    if (error) {
      console.error(error);
      redirect("/");
    }
    if (isSignUp) {
      await client.queryRequiredSingle(
        `
            insert User {
                identity := (
                    select ext::auth::Identity 
                    filter .id = <uuid>$identity_id
                )
            }
            `,
        { identity_id: tokenData!.identity_id }
      );
    }
    redirect("/");
  },
  onSignout() {
    redirect("/");
  },
});

export { GET, POST };
