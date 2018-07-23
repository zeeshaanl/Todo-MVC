import { $on } from './helpers';
import Controller from './controller';
import Store from './store';
import Template from './template';
import View from './view';

const store = new Store('todoList');

const template = new Template();
const view = new View(template);

/**
 * @type {Controller}
 */
const controller = new Controller(store, view);