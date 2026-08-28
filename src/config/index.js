/**
 * Configuration applicative, resolue depuis l'environnement de build.
 *
 * Meme patron que Fuber/src/config : les deux fronts resolvent leur
 * configuration au meme endroit, avec le meme echec explicite si une variable
 * manque.
 */

function required(name) {
    const value = import.meta.env[name];
    if (!value) {
        throw new Error(
            `Variable d'environnement manquante : ${name}. ` +
            `Copiez .env.example vers .env et renseignez-la.`
        );
    }
    return value;
}

export const API_BASE_URL = required('VITE_API_BASE_PATH');
