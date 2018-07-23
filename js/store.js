export default class Store {
    constructor(name) {
        /**
         *
         * @type {Storage}
         */
        const localstorage = window.localStorage;

        this.getLocalStorage = () =>
            JSON.parse(localstorage.getItem(name) || '[]');

        this.setLocalStorage = todos => {
            localstorage.setItem(name, JSON.stringify(todos));
        }
    }

    getTodos() {
        return this.getLocalStorage();
    }

    insert(item, callback) {
        const todos = this.getLocalStorage();
        todos.push(item);
        this.setLocalStorage(todos);

        if (callback) {
            callback();
        }
    }

    update(update, callback) {
        const id = update.id;
        const todos = this.getLocalStorage();
        let i = todos.length;
        let k;
        while (i--) {
            if (todos[i].id === id) {
                for (k in update) {
                    todos[i][k] = update[k]
                }
                break;
            }
        }

        this.setLocalStorage(todos);

        if (callback) {
            callback();
        }
    }

    /**
     *
     * @param id
     * @param callback
     */
    remove(id, callback) {
        const todos = this.getLocalStorage().filter(todo => todo.id !== id);

        this.setLocalStorage(todos);

        if (callback) {
            callback();
        }
    }
}