import clsx from "clsx";
import Spinner from "./Spinner";

const Button = (
  props: React.ComponentPropsWithoutRef<"button"> & {
    variant?: "primary" | "secondary";
    isLoading?: boolean;
  }
) => {
  const color =
    (props.variant ?? "primary") === "primary"
      ? "bg-blue-400 hover:bg-blue-500"
      : "bg-gray-400 hover:bg-gray-500";

  return (
    <button
      className={clsx(
        "flex items-center justify-center gap-2 rounded bg-blue-400 px-4 py-2 hover:bg-blue-500 disabled:bg-gray-600",
        color
      )}
      {...props}
    >
      {props.isLoading && <Spinner />}
      {props.children}
    </button>
  );
};

export default Button;
