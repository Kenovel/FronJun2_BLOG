import { generateDate } from "../utils";


export const addUser = (login, password) =>
    fetch('http://localhost:3005/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
        },
        body: JSON.stringify({
            login,
            password,
            registered_at: generateDate(),
            role_id: 2,
        }),
    }).then((createdUser) => createdUser.json());
