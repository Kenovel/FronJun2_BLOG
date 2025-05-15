export const getUsers = async () =>
    await fetch('http://localhost:3005/users').then((loadedUsers) => loadedUsers.json);
