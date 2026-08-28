import {describe, it, expect} from 'vitest';
import reducer, {setAuth} from '../utils/store/slices/AuthSlice';

/**
 * Non-regression M4 : l'intercepteur dispatchait `setAdmin(null)`, or setAdmin
 * etait le setter useState local et non une action Redux — le dispatch
 * recevait `undefined` et levait une exception.
 */
describe('AuthSlice', () => {
    it('part deconnecte', () => {
        const state = reducer(undefined, {type: '@@INIT'});
        expect(state.auth).toBe(false);
        expect(state.user).toBeNull();
    });

    it('passe connecte avec un utilisateur', () => {
        const state = reducer(undefined, setAuth({id: 1, mail: 'a@b.c'}));
        expect(state.auth).toBe(true);
        expect(state.user).toEqual({id: 1, mail: 'a@b.c'});
    });

    it('repasse deconnecte sur setAuth(null)', () => {
        const connecte = reducer(undefined, setAuth({id: 1}));
        const state = reducer(connecte, setAuth(null));
        expect(state.auth).toBe(false);
        expect(state.user).toBeNull();
    });

    it('setAuth est bien un createur d action Redux', () => {
        // C'est precisement ce qui manquait a setAdmin.
        expect(typeof setAuth).toBe('function');
        expect(setAuth(null)).toHaveProperty('type');
    });
});
