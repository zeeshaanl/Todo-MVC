export default class Controller {
    constructor(store, view) {
        this.store = store;
        this.view = view;

        this.view.bindAddItem(this.addItem.bind(this));
        this.view.bindToggleItem((id, completed) => {
            this.toggleCompleted(id, completed);
            this._filter();
        });
        this.view.bindRemoveItem(this.removeItem.bind(this));
        this._filter();
    }

    /**
     * Refresh the list
     * @private
     */
    _filter() {
        this.view.showItems(this.store.getTodos());
    }

    /**
     * Add an Item to the Store and display it in the list.
     *
     * @param {!string} title Title of the new item
     */
    addItem(title) {
        this.store.insert({
            id: Date.now(),
            title,
            completed: false
        }, () => {
            this.view.clearNewTodo();
            this._filter();
        })
    };

    /**
     * Remove the data and elements related to an Item.
     *
     * @param {!number} id Item ID of item to remove
     */
    removeItem(id) {
        this.store.remove(id, () => {
            this._filter();
        })
    };

    /**
     * Update an Item in storage based on the state of completed.
     *
     * @param {!number} id ID of the target Item
     * @param {!boolean} completed Desired completed state
     */
    toggleCompleted(id, completed) {
        this.store.update({ id, completed }, () => {
            this._filter();
        })
    }
}