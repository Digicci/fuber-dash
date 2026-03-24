export const getAuth = state => state.auth;

export const getEntreprise = state => state.entreprise.entreprise.filter(entreprise => entreprise.statut === "confirmed");

export const getTeam = state => state.team.team;

export const getOffer = state => state.offer.offer;

export const getEntreprisePending = state => state.entreprise.entreprise?.filter(entreprise => entreprise.statut === "pending");

export const getAuthUser = state => state.auth.user;

export const getDriver = (id) => state => state.entreprise.entreprise.find((e) => e.id === id)
