import PrimaryLink from "./PrimaryLink";
import { signIn, signOut, useSession } from "next-auth/react";
import Button from "./Button";
import useBuyCredits from "~/hooks/useBuyCredits";
import { api } from "~/utils/api";

const Header = () => {
  const session = useSession();
  const { buyCredits } = useBuyCredits();

  const credits = api.user.getCredits.useQuery();

  const isLoggedIn = !!session.data;

  return (
    <header className="container mx-auto flex h-16 items-center justify-between px-4 dark:bg-gray-900">
      <PrimaryLink href={"/"}>Icon Generator</PrimaryLink>
      <ul className="flex gap-8">
        <li>
          <PrimaryLink href={"/generate"}>Generate</PrimaryLink>
        </li>
        <li>
          <PrimaryLink href={"/community"}>Community</PrimaryLink>
        </li>
        {isLoggedIn && (
          <li>
            <PrimaryLink href={"/collection"}>Collection</PrimaryLink>
          </li>
        )}
      </ul>
      <ul className="flex gap-4">
        {isLoggedIn && (
          <>
            <div className="mr-4 flex items-center">
              Credits remaining {credits.data}
            </div>
            <li>
              <Button onClick={() => buyCredits()}>Buy Credits</Button>
            </li>
            <li>
              <Button variant="secondary" onClick={() => signOut()}>
                Logout
              </Button>
            </li>
          </>
        )}
        {!isLoggedIn && (
          <li>
            <Button onClick={() => signIn()}>Login</Button>
          </li>
        )}
      </ul>
    </header>
  );
};

export default Header;
