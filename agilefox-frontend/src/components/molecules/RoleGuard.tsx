"use client";

import React from "react";

interface RoleGuardProps {
  roles: string[] | undefined;
  allowed: ("admin" | "product owner" | "scrum master" | "member")[];
  children: React.ReactNode;
}

export default function RoleGuard({ roles, allowed, children }: RoleGuardProps) {
  const hasAccess = roles?.some((role) =>
    allowed.includes(role as "admin" | "product owner" | "scrum master" | "member")
  );

  if (!hasAccess) return null;

  return <>{children}</>;
}
