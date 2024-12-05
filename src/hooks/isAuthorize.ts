export const IsAuthorize = () => {
    const userRoles = sessionStorage.getItem("roles");
    if (userRoles != 'admin') {
        return false
    }

    return true

};
