const availableRoles = {
  productOwner: "product owner",
  scrumMaster: "scrum master",
  member: "member",
  admin: "admin",
};

interface UserRoles {
  roles: string[] | undefined;
}
export function canManageProject(roles: UserRoles["roles"]) {
  return roles?.find(
    (role) =>
      role === availableRoles.productOwner || role === availableRoles.admin
  );
}

export function canAddProject(roles: UserRoles["roles"]) {
  return roles?.find((role) => role === availableRoles.admin);
}
