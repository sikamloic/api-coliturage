const allRoles = {
    user: ['read'],
    admin: ['create', 'delete', 'read', 'write'],
};

const roles = Object.keys(allRoles);
const roleRights = new Map(Object.entries(allRoles));

module.exports = {
    roles,
    roleRights,
};