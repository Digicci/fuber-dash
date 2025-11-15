import {createSelector} from "@reduxjs/toolkit";

export const getAuth = state => state.auth;

const getBaseEntreprise = state => state.entreprise.entreprise

export const getEntreprise = createSelector([getBaseEntreprise], entreprise => entreprise.filter(entreprise => entreprise.statut === "confirmed"))

export const getTeam = state => state.team.team;

export const getOffer = state => state.offer.offer;

export const getEntreprisePending = createSelector([getBaseEntreprise], entreprise => entreprise.filter(entreprise => entreprise.statut === "pending"));