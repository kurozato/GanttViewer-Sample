

import { Utilities as _ } from '../utilities.js'
export class GanttViewerView {

    #callFunc = {};

    initMain = () => {
        let picker = new flatpickr('.flatpickr', {
            locale: 'ja',
            monthSelectorType: 'static',
        });

        document.getElementById("ul-lnk").addEventListener("click", () => {
            document.getElementById("upload-file").click();
        });

        document.getElementById('upload-file').addEventListener('change', (e) => {
            const file_reader = new FileReader();

            file_reader.addEventListener('load', (e) => {
                const json = JSON.parse(e.target.result);
                console.log(json);
                this.#callFunc['uploadFile'](json);
            });
            file_reader.readAsText(e.target.files[0]);
            document.getElementById('ul-lnk-label').textContent = e.target.files[0].name;
        });

        document.getElementById('view-table-page').addEventListener('click', () => {
            document.getElementById('table-page').classList.remove('active');
        }, false);
        document.getElementById('hide-table-page').addEventListener('click', () => {

            document.getElementById('table-page').classList.add('active');

        }, false);

        document.getElementById('view-Gantt').addEventListener('click', () => {
            document.getElementById('table-page').classList.add('active');
            this.#callFunc['viewGantt']();
        }, false)
    }

    //table
    createTable = (tasks) => {
        const result = document.getElementById('result-table-wrap');
        const maxIndex = document.getElementById('table-max-index');

        result.innerHTML = '';

        const table = document.createElement('table');
        const tbody = document.createElement('tbody');
        const thead = document.createElement('thead');

        table.id = 'result-table';
        thead.id = 'result-thead';
        tbody.id = 'result-tbody';

        thead.innerHTML = '<th>#</th><th>project</th><th>item</th><th>task</th><th>plan</th><th>progress</th><th>person</th><th>start</th><th>end</th><th>-</th>'

        tasks.forEach((task, index) => {
            const tr = document.createElement('tr');
            tr.innerHTML =
                `<td>${index + 1}</td>` +
                `<td>${_.escapeHtml(task.project)}</td>` +
                `<td>${_.escapeHtml(task.item)}</td>` +
                `<td><i class="bi ${_.escapeHtml(task.custom_class)}"></i> ${_.escapeHtml(task.process)}</td>` +
                `<td>${_.escapeHtml(task.planTime)}H</td>` +
                `<td>${_.escapeHtml(task.progress)}%</td>` +
                `<td>${_.escapeHtml(task.person)}</td>` +
                `<td>${_.escapeHtml(task.start)}</td>` +
                `<td>${_.escapeHtml(task.end)}</td>`;

            const td = document.createElement('td');
            const btn = document.createElement('button');
            btn.classList.add('btn', 'btn-sm', 'btn-outline-danger');
            btn.innerHTML = '<i class="bi bi-x-lg"></i>';
            btn.addEventListener('click', () => { /* TODO */ }, false);
            td.append(btn);
            tr.append(td);
            tbody.append(tr);
        });

        maxIndex.value = tasks.length;

        table.append(thead, tbody);
        table.classList.add('table', 'table-sm', 'table-hover')
        result.append(table);

        // dowload
        const link = document.getElementById('dl-lnk');

        const json = JSON.stringify(tasks, null, 4);
        const blob = new Blob([json], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        link.href = url
        link.download = _.convertDate(new Date()) + '-Tasks.json'
    }

    redrawGantt(tasks) {
        document.getElementById('result-gantt-wrap').innerHTML = '<svg id="gantt"></svg>';
        this.drawGantt(tasks)
    }

    drawGantt(tasks) {
        document.getElementById('result-gantt-wrap').innerHTML = '<svg id="gantt"></svg>';
        let $bar = null;
        // setup gantt
        console.log(tasks);
        let gantt = new GanttViewer("#gantt", tasks, {

            header_height: 45,
            padding: 10,
            column_width: 100,
            on_click: (task) => {
                /* TODO */
                alert(task.process);
            },
            on_hoverin: (task, bar) => {
                if ($bar !== bar) {
                    bootstrap.Tooltip.getInstance($bar)?.dispose();
                }
                if (bootstrap.Tooltip.getInstance(bar) === null) {
                    const tooltip = new bootstrap.Tooltip(bar, {
                        animation: false,
                        placement: 'auto',
                        html: true,
                        //title: `<div>${task.project} /${task.item}</div><div><i class="bi ${task.custom_class}"></i> ${task.process} ${task.planTime}H (<small>${task.progress}%</small>)</div><div>by ${task.person}</div><div>${task.start} <i class="bi bi-caret-right"></i> ${task.end}</div>`,
                        title: `<div>${_.escapeHtml(task.project)} /${_.escapeHtml(task.item)}</div><div><i class="bi ${_.escapeHtml(task.custom_class)}"></i> ${_.escapeHtml(task.process)} ${_.escapeHtml(task.planTime)}H (<small>${_.escapeHtml(task.progress)}%</small>)</div><div>by ${_.escapeHtml(task.person)}</div><div>${_.escapeHtml(task.start)} <i class="bi bi-caret-right"></i> ${_.escapeHtml(task.end)}</div>`,
                        trigger: 'manual',
                    });
                    tooltip.show();
                    $bar = bar;
                }
            },
            on_hoverout: () => {
                const tooltip = bootstrap.Tooltip.getInstance($bar);
                tooltip?.dispose();
                $bar = null;
            },
        });
    }

    /*** model ***/

    /*** link event ***/
    uploadFile(fn) { this.#callFunc['uploadFile'] = fn; }
    viewGantt(fn) { this.#callFunc['viewGantt'] = fn; }

}


