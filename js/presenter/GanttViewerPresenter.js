
import { GanttTask } from "./GanttTask.js";
//import { GanttViewerView } from "../view/GanttViewerView.js";
//import { GanttViewerService } from "../model/GanttViewerService.js";
import { ApiHelper } from './apiHelper.js'
export class GanttViewerPresenter {

    /**
     * @type {GanttViewerView}
     */
    #view;

    #service;

    #task;

    #lTask;

    constructor(view, service) {
        this.#view = view;
        this.#service = service;
        this.#task = new GanttTask();

        this.#linkEventOfView();
    }

    #linkEventOfView() {
        const view = this.#view;

        view.uploadFile((data) => {
            this.upload(data);
        });
        view.viewGantt(() => this.taskToGantt());
    }


    initilize() {
        this.#view.initMain();

        this.#service.get()
            // fetch('../../task.json')
            //     .then(res => res.json())
            .then(data => {
                //console.log(data);

                this.addRange(data);
                this.taskToGantt();
            });

    }

    taskToGantt() {
        //clone
        this.#lTask = Object.assign([], this.#task.Items);

        //view gantt
        this.#view.drawGantt(this.#lTask);
    }

    addSingle(task) {
        //add task (replace)
        this.#task.removeById(task.id);
        this.#task.add(task);

        //rebuild table
        this.#view.createTable(this.#task.Items);
    }

    addRange(tasks) {
        //clear tasks
        this.#task.Items = [];

        this.#task.addItems(tasks);

        this.#view.createTable(tasks);
    }

    removeSingle(id) {
        //remove task
        this.#task.removeById(id);

        //rebuild table
        this.#view.createTable(this.#task.Items);
    }

    upload(json) {

        if (toString.call(json) === '[object Array]') {
            this.addRange(json);
        }
    }

}