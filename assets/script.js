class Question {
    constructor(question, answer, guess, isCorrect) {
        this.question = question;
        this.answer = answer;
        this.guess = guess,
        this.isCorrect = false;
        this.checkAnswer = function() {
            if (this.guess == this.answer) {
                this.isCorrect = true;
            } else {
                this.isCorrect = false;
            }
        }
    }

}

const questions = [];
const displayQuestions = [];
let allTrue = false;

questions.push(new Question("What is Jon's favorite color?",""));
questions.push(new Question("What is Jon's favorite number?","7"));
questions.push(new Question("What is Jon's favorite number?","7"));


$(document).ready(function() {

    questions.forEach(function(question, index) {

        displayQuestions.push(
            `<div class="row">
                <div class="center col s6 offset-s3 question" id="question${index}">
                    <h1>${question.question}</h1>
                    <div class="center input-field col s12">
                        <form>
                            <input class="center guess" id="guess${index}" type="text">
                            <button class="center btn waves-effect checkAnswer" type="submit" action="submit" data-index="${index}" id="submit${index}">Submit</button>
                        </form>
                    </div>
                </div>
            </div>`
        );

    });
    
    function display(question_number) {
        $('.questions').empty();
        console.log(question_number);
        if (question_number < questions.length) {
            $('.questions').append(displayQuestions[question_number]);
        } else {
            checkAll();
            if(allTrue) {
                $('.questions').append(`<h1>I love you</h1>`);
            } else {
            display(Math.floor(Math.random()*questions.length+1)-1);
            }
        }

    }

    display(0);

    function checkAll() {
        let numCorrect = questions.length;
        questions.forEach(function(q) {
            if(!q.isCorrect) {
                numCorrect--;
            }
        });
        if (numCorrect == questions.length) {
            allTrue = true;
        }
    }

    $(document).on('click','.checkAnswer', function() {
        event.preventDefault();
        event.stopPropagation();
        let index = $(this).data("index");
        let guess = $(`#guess${index}`).val().toLowerCase().trim();
        questions[index].guess = guess;
        questions[index].checkAnswer();
        console.log(questions[index].isCorrect);
        // if(questions[index].isCorrect) {
            display(index+1);
        // }
    });


});
