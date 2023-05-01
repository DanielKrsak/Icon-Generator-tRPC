import PrimaryLink from "./PrimaryLink";
import { signIn, signOut, useSession } from "next-auth/react";
import Button from "./Button";
import useBuyCredits from "~/hooks/useBuyCredits";

const Header = () => {
  const session = useSession();
  const { buyCredits } = useBuyCredits();

  const isLoggedIn = !!session.data;

  return (
    <header className="container mx-auto flex h-16 items-center justify-between px-4 dark:bg-gray-900">
      <PrimaryLink href={"/"}>Icon Generator</PrimaryLink>
      <ul>
        <li>
          <PrimaryLink href={"/generate"}>Generate</PrimaryLink>
        </li>
      </ul>
      <ul className="flex gap-4">
        {isLoggedIn && (
          <>
            <li>
              <Button
                onClick={async () => await buyCredits().catch(console.error)}
              >
                Buy Credits
              </Button>
            </li>
            <li>
              <Button
                variant="secondary"
                onClick={async () => await signOut().catch(console.error)}
              >
                Logout
              </Button>
            </li>
          </>
        )}
        {!isLoggedIn && (
          <li>
            <Button onClick={async () => await signIn().catch(console.error)}>
              Login
            </Button>
          </li>
        )}
      </ul>
    </header>
  );
};

export default Header;
