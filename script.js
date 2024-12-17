
const lessons = [
	{
		title: "Урок 1: Основи німецької",
		description: "Алфавіт, базові слова.",
		isCompleted: false,
	},
	{
		title: "Урок 2: Знайомство",
		description: "Як представитись.",
		isCompleted: false,
	},
	{
		title: "Урок 3: Числа",
		description: "Вивчення чисел та лічби.",
		isCompleted: false,
	},
];

let courseProgress = 0;

function loadSection(section) {
	const content = document.getElementById("content");
	content.innerHTML = ""; 

	if (section === "lessons") {
		lessons.forEach((lesson, index) => {
			const card = document.createElement("div");
			card.classList.add("card");
			card.innerHTML = `
                <h3 onclick="toggleCheckbox('task${index}')">${
				lesson.title
			}</h3>
                <p>${lesson.description}</p>
                <input type="checkbox" id="task${index}" ${
				lesson.isCompleted ? "checked" : ""
			} onclick="markLessonComplete(${index})">
                <label for="task${index}">Позначити як завершений</label>
                <button onclick="openLesson(${index})">Відкрити урок</button>
            `;
			content.appendChild(card);
		});
	} else if (section === "homework") {
		const currentLesson = lessons[courseProgress / 10 - 1]; 
		if (currentLesson && currentLesson.isCompleted) {
			content.innerHTML = `
                <h2>Домашнє завдання до уроку ${currentLesson.title}</h2>
                <p>Позначте виконані завдання:</p>
                <div>
                    <input type="checkbox" id="task1">
                    <label for="task1">Завдання 1</label>
                </div>
                <div>
                    <input type="checkbox" id="task2">
                    <label for="task2">Завдання 2</label>
                </div>
                <button onclick="markHomeworkComplete()">Завершити</button>
            `;
		} else {
			content.innerHTML = `
                <h2>Домашнє завдання</h2>
                <p>Щоб перейти до домашнього завдання, потрібно спершу завершити урок.</p>
            `;
		}
	}
}

function markLessonComplete(lessonIndex) {
	const lesson = lessons[lessonIndex];
	lesson.isCompleted = !lesson.isCompleted; 
	if (lesson.isCompleted) {
		courseProgress += 10; 
	} else {
		courseProgress -= 10; 
	}
	updateProgressBar();
	loadSection("lessons"); 
}

function markHomeworkComplete() {
	alert("Домашнє завдання завершено!");
	courseProgress += 5;
	updateProgressBar();
	loadSection("homework"); 
}

function updateProgressBar() {
	const progressBar = document.getElementById("progressBar");
	progressBar.value = courseProgress;

	if (courseProgress === 100) {
		const homeworkButton = document.createElement("button");
		homeworkButton.innerText = "Перейти до домашнього завдання";
		homeworkButton.onclick = () => loadSection("homework");
		document.getElementById("content").appendChild(homeworkButton);
	} else {
		
		const existingButton = document.querySelector("button");
		if (existingButton) {
			existingButton.remove();
		}
	}
	console.log(`Прогрес курсу: ${courseProgress}%`);
}

document.querySelectorAll(".nav-btn").forEach((button) => {
	button.addEventListener("click", () => {
		document
			.querySelectorAll(".nav-btn")
			.forEach((btn) => btn.classList.remove("active"));
		button.classList.add("active");
		loadSection(button.dataset.section);
	});
});

loadSection("lessons");

function toggleCheckbox(checkboxId) {
	const checkbox = document.getElementById(checkboxId);
	checkbox.checked = !checkbox.checked; 
}
