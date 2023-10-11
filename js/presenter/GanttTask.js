import { Utilities as _ } from '../utilities.js'
export class GanttTask {

    Items = [];

    isEqual = (value, other) => {
        const vJson = JSON.stringify(Object.entries(value).sort());
        const oJson = JSON.stringify(Object.entries(other).sort());

        return vJson === oJson;
    }

    #get_default_task() {
        const default_task = {
            id: null,
            name: null,
            project: null,
            process: null,
            item: null,
            person: null,
            planTime: 0,
            start: '2000-01-01',
            end: '2000-01-01',
            progress: 0,
            custom_class: "",
        }
        return default_task;
    }

    /**
     * 
     * @param task 
     */
    add(task) {
        const item = Object.assign(this.#get_default_task(), task);
        this.Items.push(item);
    }

    /**
     * 
     * @param {Array} tasks 
     */
    addItems(tasks) {
        tasks.forEach(task => {
            this.add(task);
        });
    }

    removeById(id) {
        this.Items = this.Items.filter(i => i.id !== id)
    }

    removeById(task) {

        const item = Object.assign(this.#get_default_task(), task);
        this.Items = this.Items.filter(i => !_.isEqual(i, item))
    }


}