import { useSelector } from 'react-redux';
import { server } from '../bff';
import { selectUserSesson } from '../selectors';
import { useCallback } from 'react';

export const useServerRequest = () => {
    const session = useSelector(selectUserSesson);
    return useCallback(
        (operation, ...params) => {
            const request = ['register', 'authorize', 'fetchPost'].includes(operation)
                ? params
                : [session, ...params];
            return server[operation](...request);
        },
        [session],
    );
};
