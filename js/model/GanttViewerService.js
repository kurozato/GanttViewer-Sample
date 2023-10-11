
export class GanttViewerService {



    constructor() {

    }

    #addDate(dateString, addTerm) {
        const dt = new Date(dateString);
        dt.setDate(dt.getDate() + addTerm);
        return dt.toISOString().substring(0, 10);
    }

    get() {

        return fetch('../../task.json')
            .then(res => res.json())
            .then(data => {
                //console.log(data);

                const day1 = new Date("2023/07/10");
                const day2 = new Date();
                const term = Math.ceil((day2 - day1) / 86400000);
                data.forEach(task => {
                    task.start = this.#addDate(task.start, term);
                    task.end = this.#addDate(task.end, term);
                });

                return data;
            });

    }


}