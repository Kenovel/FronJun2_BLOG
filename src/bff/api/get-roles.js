export const getRoles = async () =>
    await fetch('http://localhost:3005/roles').then((loadedRoles) => loadedRoles.json());
