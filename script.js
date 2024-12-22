const checkboxes = document.querySelectorAll(".lesson-checkbox");
const nextButton = document.getElementById("nextLesson");
const progressBar = document.getElementById("progress-bar");
const progressText = document.getElementById("progress-text");

// Функція для перевірки прогресу
function updateProgress() {
	const total = checkboxes.length;
	const checked = Array.from(checkboxes).filter(
		(checkbox) => checkbox.checked
	).length;
	const progress = Math.round((checked / total) * 100);

	progressBar.value = progress;
	progressText.textContent = `${progress}%`;

	if (progress === 100) {
		nextButton.classList.add("active");
	} else {
		nextButton.classList.remove("active");
	}
}

// Зберегти відповіді
function saveAnswers() {
	const answers = Array.from(checkboxes).map((checkbox) => checkbox.checked);
	localStorage.setItem("lesson1Answers", JSON.stringify(answers));
	alert("Відповіді збережено!");
}

// Перехід до наступного уроку
function goToNextLesson() {
	saveAnswers(); // Зберегти відповіді перед переходом
	window.location.href = "lesson2.html";
}

// Завантаження збережених відповідей
function loadAnswers() {
	const savedAnswers = JSON.parse(localStorage.getItem("lesson1Answers")) || [];
	checkboxes.forEach((checkbox, index) => {
		if (savedAnswers[index]) {
			checkbox.checked = true;
		}
	});
	updateProgress(); // Оновити прогрес після завантаження
}

// Слухачі подій для чекбоксів
checkboxes.forEach((checkbox) => {
	checkbox.addEventListener("change", updateProgress);
});

// Завантаження відповідей під час відкриття сторінки
window.onload = loadAnswers;
