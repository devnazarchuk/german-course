
const checkboxes = document.querySelectorAll(".section-checkbox");
const progressBar = document.getElementById("progress-bar");
const progressText = document.getElementById("progress-text");
document.querySelectorAll(".section-checkbox").forEach((checkbox) => {
	checkbox.addEventListener("change", updateProgress);
});
function updateProgress() {
	let totalSections = document.querySelectorAll(".section-checkbox").length;
	let completedSections = document.querySelectorAll(
		".section-checkbox:checked"
	).length;

	let progress = (completedSections / totalSections) * 100;
	document.getElementById("progress-bar").value = progress;
	document.getElementById("progress-text").textContent = `${Math.round(
		progress
	)}%`;

	if (progress === 100) {
		document.getElementById("go-to-homework").disabled = false;
	} else {
		document.getElementById("go-to-homework").disabled = true;
	}
}

checkboxes.forEach((checkbox) => {
	checkbox.addEventListener("change", updateProgress);
});

updateProgress();

