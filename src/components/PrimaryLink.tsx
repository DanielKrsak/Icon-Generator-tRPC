import Link, { type LinkProps } from "next/link";
import React, { type ReactNode } from "react";

const PrimaryLink = (props: LinkProps & { children: ReactNode }) => {
  return (
    <Link className="hover:text-cyan-500" {...props}>
      {props.children}
    </Link>
  );
};

export default PrimaryLink;
