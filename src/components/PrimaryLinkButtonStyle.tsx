import Link, { type LinkProps } from "next/link";
import React, { type ReactNode } from "react";
import clsx from "clsx";

const PrimaryLinkButtonStyle = (
  props: LinkProps & { children: ReactNode; className?: string }
) => {
  return (
    <Link
      {...props}
      className={clsx(
        "rounded bg-blue-400 px-4 py-2 hover:bg-blue-500",
        props.className ?? ""
      )}
    >
      {props.children}
    </Link>
  );
};

export default PrimaryLinkButtonStyle;
