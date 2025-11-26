import { openDB, type DBSchema } from 'idb';

interface Presentation {
    id: string;
    title: string;
    content: string;
    updatedAt: number;
}

interface MarpDB extends DBSchema {
    presentations: {
        key: string;
        value: Presentation;
        indexes: { 'by-date': number };
    };
}

const DB_NAME = 'marp-builder-db';
const STORE_NAME = 'presentations';

const dbPromise = openDB<MarpDB>(DB_NAME, 1, {
    upgrade(db) {
        const store = db.createObjectStore(STORE_NAME, { keyPath: 'id' });
        store.createIndex('by-date', 'updatedAt');
    },
});

export const savePresentation = async (presentation: Presentation) => {
    const db = await dbPromise;
    await db.put(STORE_NAME, presentation);
};

export const getPresentation = async (id: string) => {
    const db = await dbPromise;
    return db.get(STORE_NAME, id);
};

export const getAllPresentations = async () => {
    const db = await dbPromise;
    return db.getAllFromIndex(STORE_NAME, 'by-date');
};

export const deletePresentation = async (id: string) => {
    const db = await dbPromise;
    await db.delete(STORE_NAME, id);
};
