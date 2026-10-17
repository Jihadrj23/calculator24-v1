import { Link as RouterLink } from "@tanstack/react-router";
import type { AnchorHTMLAttributes } from "react";

type Props = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & { href: string };

export function Link({ href, ...rest }: Props) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return <RouterLink to={href as any} {...(rest as any)} />;
}
