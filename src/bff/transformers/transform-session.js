export const transformSession = (dbSession) => ({
    id: dbSession.id,
    login: dbSession.login,
    user: dbSession.user,
});
