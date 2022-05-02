const quizForm = document.querySelector('.quiz');
const answers = Array.from(document.querySelectorAll('.answer'));
const scoreHeading = document.querySelector('.score-heading');
const scoreText = document.querySelector('.score-text');
const mainBox = document.querySelector('main');
const arrowIcon = document.querySelector('.arrow-down');

const handleQuiz = (e) => {
	e.preventDefault();

	const checkedAnswers = answers.filter((answer) => answer.checked);

	if (checkedAnswers.length < 10) {
		scoreText.textContent = 'Zaznacz wszystkie odpowiedzi!';
		scoreText.classList.add('error');
	} else {
		mainBox.scrollTop = 0;
		scoreText.classList.remove('error');
		const trueAnswers = checkedAnswers.filter(
			(answer) => answer.value === 'true'
		);
		const percent = (trueAnswers.length / checkedAnswers.length) * 100;

		scoreText.textContent = `Zdobyłeś ${percent}%! Uzyskałeś ${trueAnswers.length}/${checkedAnswers.length} poprawnych odpowiedzi.`;

		checkedAnswers.forEach((answer) => {
			const answerBox = answer.closest('.answers-box');
			const questionHeader = answerBox.querySelector('.question');
			const questionHeaderText = questionHeader.textContent;

			if (answer.value === 'true') {
				answerBox.classList.remove('incorrect');
				answerBox.classList.add('correct');
				questionHeader.innerHTML = `${questionHeaderText} <i class="fa-solid fa-check"></i>`;
			} else {
				answerBox.classList.remove('correct');
				answerBox.classList.add('incorrect');
				questionHeader.innerHTML = `${questionHeaderText} <i class="fa-solid fa-xmark"></i>`;
			}
		});
	}
};

const arrowHide = () => {
	if (arrowIcon.style.display !== 'none') {
		if (mainBox.scrollTop >= mainBox.scrollHeight - mainBox.offsetHeight - 80) {
			arrowIcon.style.display = 'none';
		}
	}
};

quizForm.addEventListener('submit', handleQuiz);
mainBox.addEventListener('scroll', arrowHide);
