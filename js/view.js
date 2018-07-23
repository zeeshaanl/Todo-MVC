import { ItemList } from './item';
import { qs, $on, $delegate } from './helpers';

const _itemId = element => parseInt(element.parentNode.dataset.id || element.parentNode.parentNode.dataset.id, 10);

export default class View {
    constructor(template) {
        this.template = template;
        this.$todoList = qs('.todo-list');
        this.$main = qs('.main');
        this.$newTodo = qs('.new-todo');
        this.$destroy = qs('.destroy');
    }

    bindAddItem(handler) {
        $on(this.$newTodo, 'change', ({ target }) => {
            const title = target.value.trim();
            if (title) {
                handler(title);
            }
        })
    }

    /**
     *
     * @param {function} handler Function called on to-do complete select or deselect
     */
    bindToggleItem(handler) {
        $delegate(this.$todoList, '.toggle', 'click', ({ target }) => {
            handler(_itemId(target), target.checked)
        })
    }

    bindRemoveItem(handler) {
        $delegate(this.$todoList, '.destroy', 'click', ({ target }) => {
            handler(_itemId(target));
        })
    }

    /**
     * Populate the todo list with a list of items.
     *
     * @param {ItemList} items Array of items to display
     */
    showItems(items) {
        this.$todoList.innerHTML = this.template.itemList(items);
    }

    /**
     * Clear the new todo input
     */
    clearNewTodo() {
        this.$newTodo.value = '';
    }
}