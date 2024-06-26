"use client";

import { Avatar, Button, NavbarItem, Popover, PopoverContent, PopoverTrigger } from "@nextui-org/react";
import * as actions from "@/actions";
import { useSession } from "next-auth/react";
import { revalidatePath } from "next/cache";

export default function HeaderAuth() {
  const session = useSession();

  let authContent: React.ReactNode;
  if (session.status === "loading") {
    return null;
  } else if (session?.data?.user) {
    authContent = (
      <Popover placement="left">
        <PopoverTrigger>
          <Avatar src={session.data.user.image || "/default-avatar.png"} />
        </PopoverTrigger>
        <PopoverContent>
          <div className="p-4">
            <form
              action={() => {
                actions.signOut();
                window.location.reload();
              }}
            >
              <Button type="submit" color="secondary" variant="bordered">
                Sign Out
              </Button>
            </form>
          </div>
        </PopoverContent>
      </Popover>
    );
  } else {
    authContent = (
      <>
        <NavbarItem>
          <form action={actions.signIn}>
            <Button type="submit" color="secondary" variant="bordered">
              Sign In
            </Button>
          </form>
        </NavbarItem>
        <NavbarItem>
          <form action={actions.signIn}>
            <Button type="submit" color="primary" variant="flat">
              Sign Up
            </Button>
          </form>
        </NavbarItem>
      </>
    );
  }

  return <>{authContent} </>;
}
