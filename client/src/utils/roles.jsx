const ROLES = {
    superAdmin: [
        "view:company", "create:company", "update:company", "delete:company",
        "update:assignedPolicies",
        "view:teams", "create:teams", "update:teams", "delete:teams"
    ],
    admin: [
        "view:company", "create:company", "update:company", "delete:company",
        "assignedPolicies:update",
        "view:teams", 
    ],
    user: [
    ]
}

export const hasPermission = (role, permission) => {
    return (ROLES[role]).includes(permission);
}