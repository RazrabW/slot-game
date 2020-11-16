/*
    API для работы с IndexedDB
*/

const DB_NAME = 'gambling';
const STORAGE_NAME = 'data';
const DB_VERSION = 1;
let DB;

export default {
    async getDb() { //Внутренний метод для обращения к базе
        return new Promise((resolve, reject) => {
            if (DB) {
                return resolve(DB);
            }

            const request = window.indexedDB.open(DB_NAME, DB_VERSION);
            request.onerror = e => {
                console.log('Error opening db', e);
                reject('Error');
            }
            request.onsuccess = e => {
                DB = e.target.result;
                resolve(DB);
            }
            request.onupgradeneeded = e => {

                let db = e.target.result;
                db.createObjectStore(STORAGE_NAME, { autoIncrement: true });
            }
        })
    },
    async load() { //Возвращает данные из IndexedDB
        let db = await this.getDb()
        return new Promise(resolve => {
            let trans = db.transaction([STORAGE_NAME], 'readwrite')
            let store = trans.objectStore(STORAGE_NAME);

            let getData = store.get(1);

            getData.onsuccess = (event) => {
                let data = event.target.result;
                if (data) {
                    resolve(data);
                } else {
                    console.log('Not found');
                }
            }
        });
    },
    async save(data) { //Записывает данные в IndexedDB
        let db = await this.getDb();
        return new Promise(resolve => {
            let trans = db.transaction([STORAGE_NAME], 'readwrite');

            trans.oncomplete = () => {
                resolve();
            }
            trans.onerror = (event) => {
                alert(`Error storing note ${event.target.errorCode}`);
            }

            let store = trans.objectStore(STORAGE_NAME);
            store.put(data, 1);
        })
    },
    async clearStorage() { //Полностью очищает хранилище IndexedDB
        let db = await this.getDb();
        return new Promise(resolve => {
            let trans = db.transaction([STORAGE_NAME], 'readwrite');
            let store = trans.objectStore(STORAGE_NAME);

            store.clear();
            resolve();
        });
    }
}