// ==========================
// WAIT FOR DOM
// ==========================
document.addEventListener("DOMContentLoaded", function () {

    // ==========================
    // STATE
    // ==========================
    let tasks = [];

    // ==========================
    // EVENT LISTENERS
    // ==========================
    document.getElementById("addTaskBtn").addEventListener("click", addTask);

    document.getElementById("presetTask").addEventListener("change", function () {
        const selectedTask = this.value;

        if (selectedTask !== "") {
            document.getElementById("taskName").value = selectedTask;
        }
    });

    // ==========================
    // ADD TASK
    // ==========================
    function addTask() {

        const nameInput = document.getElementById("taskName").value.trim();
        const priorityInput = document.getElementById("priority").value;
        const importantInput = document.getElementById("important").checked;
        const completedInput = document.getElementById("completed").checked;

        if (nameInput === "" || priorityInput === "") {
            alert("Please enter a task name and select a priority.");
            return;
        }

        // OPTIONAL LIMIT
        if (tasks.length >= 4) {
            alert("Maximum of 4 active tasks allowed.");
            return;
        }

        const task = {
            id: Date.now(),
            name: nameInput,
            priority: priorityInput,
            isImportant: importantInput,
            isCompleted: completedInput,
            date: new Date().toLocaleString()
        };

        tasks.push(task);

        console.log(JSON.stringify(tasks));

        renderTasks();
        resetForm();
    }

    // ==========================
    // RENDER TASKS
    // ==========================
    function renderTasks() {

        const container = document.getElementById("taskmanager");

        let html = "";

        tasks.forEach(task => {
            html += `
                <div class="task" id="task-${task.id}">
                    <p><strong>${task.name}</strong></p>
                    <p>Priority: ${task.priority}</p>
                    <p>Date: ${task.date}</p>

                    <button onclick="toggleComplete(${task.id})">
                        Toggle Complete
                    </button>

                    <button onclick="deleteTask(${task.id})">
                        Delete
                    </button>
                </div>
            `;
        });

        container.innerHTML = html;

        // APPLY STYLING
        tasks.forEach(task => {
            const element = document.getElementById(`task-${task.id}`);

            if (!element) return;

            // Important → red text
            if (task.isImportant) {
                element.style.color = "red";
            }

            // Completed → strikethrough
            if (task.isCompleted) {
                element.style.textDecoration = "line-through";
            }

            // Priority border color
            if (task.priority === "High") {
                element.style.borderLeft = "4px solid #ef4444";
            }
            if (task.priority === "Medium") {
                element.style.borderLeft = "4px solid #f59e0b";
            }
            if (task.priority === "Low") {
                element.style.borderLeft = "4px solid #22c55e";
            }
        });
    }

    // ==========================
    // DELETE TASK
    // ==========================
    window.deleteTask = function (id) {
        tasks = tasks.filter(task => task.id !== id);

        console.log(JSON.stringify(tasks));

        renderTasks();
    };

    // ==========================
    // TOGGLE COMPLETE
    // ==========================
    window.toggleComplete = function (id) {
        tasks = tasks.map(task => {
            if (task.id === id) {
                task.isCompleted = !task.isCompleted;
            }
            return task;
        });

        console.log(JSON.stringify(tasks));

        renderTasks();
    };

    // ==========================
    // RESET FORM
    // ==========================
    function resetForm() {
        document.getElementById("taskName").value = "";
        document.getElementById("priority").value = "";
        document.getElementById("important").checked = false;
        document.getElementById("completed").checked = false;
        document.getElementById("presetTask").value = "";
    }

});