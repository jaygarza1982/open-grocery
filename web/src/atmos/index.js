import { atom } from 'recoil';

export const listItemsAtom = atom({
    key: 'listItemsAtom',
    default: [],
});

export const webSocketAtom = atom({
    key: 'webSocketAtom',
    default: null,
});
