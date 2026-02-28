import { isArrayWithItems } from './is-array-with-items.js';

export const checkEnvExist = (envs: Record<string, string | undefined | number | boolean>) => {
    const missingEnvs = Object.entries(envs).filter(([_, value]) => !value);

    if (isArrayWithItems(missingEnvs)) {
        const missingEnvsString = missingEnvs
            .map(([key]) => key)
            .join(', ')
            .toUpperCase();
        throw new Error(`Missing database ENV variables: ${missingEnvsString}`);
    }

    return envs;
};
