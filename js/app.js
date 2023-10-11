import { GanttViewerService } from './model/GanttViewerService.js'
import { GanttViewerView } from './view/GanttViewerView.js';
import { GanttViewerPresenter } from './presenter/GanttViewerPresenter.js';

export class App {
    constructor() {
        //model
        const service = new GanttViewerService();
        //view
        const view = new GanttViewerView();
        //presenter
        const presenter = new GanttViewerPresenter(view, service);

        presenter.initilize();
    }

    startup() {

    }
}