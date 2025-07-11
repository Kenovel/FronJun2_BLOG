import { transformUser } from '../transformers';

export const getUser = (loginToFind) =>
    fetch(`http://localhost:3005/users?login=${loginToFind}`)
        .then((loadedUsers) => loadedUsers.json())
        .then(([loadedUser]) => loadedUser && transformUser(loadedUser));
