import {describe, it, expect, vi} from 'vitest';
import {render, screen} from '@testing-library/react';
import {MemoryRouter, Routes, Route} from 'react-router-dom';
import PrivateRoute from '../utils/PrivateRoute';

/**
 * Non-regression M5.
 *
 * L'ancienne version appelait navigate() dans un useEffect, or cette fonction
 * *retournait* du JSX <Navigate/> : la redirection ne se produisait jamais et
 * le back-office restait accessible sans session.
 */

const mockAuth = {isConnected: () => false};
vi.mock('../utils/hook/useAuthAdmin.jsx', () => ({
    useAuthAdmin: () => mockAuth
}));

function renderAt() {
    return render(
        <MemoryRouter initialEntries={['/prive']}>
            <Routes>
                <Route path="/login" element={<div>page de connexion</div>} />
                <Route path="/prive" element={
                    <PrivateRoute><div>tableau de bord</div></PrivateRoute>
                } />
            </Routes>
        </MemoryRouter>
    );
}

describe('PrivateRoute administrateur', () => {
    it('redirige vers /login sans session', () => {
        mockAuth.isConnected = () => false;
        renderAt();
        expect(screen.getByText('page de connexion')).toBeInTheDocument();
        expect(screen.queryByText('tableau de bord')).not.toBeInTheDocument();
    });

    it('affiche le back-office avec une session valide', () => {
        mockAuth.isConnected = () => true;
        renderAt();
        expect(screen.getByText('tableau de bord')).toBeInTheDocument();
    });
});
