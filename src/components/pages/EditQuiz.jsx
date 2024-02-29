import { useState, useEffect } from "react";
import ApiService from "../service/ApiService";
import { useParams } from "react-router-dom";

function EditQuiz() {
  let { id } = useParams();

  const dbQuiz = new ApiService(`http://localhost:8080/quiz/${id}`);
  const dbQuestions = new ApiService(`http://localhost:8080/questions`);

  const [quiz, setQuiz] = useState();

  function fetchQuiz() {
    dbQuiz
      .get()
      .then((quiz) => {
        dbQuestions.get(`/quiz/${quiz.id}`).then((questions) => {
          quiz.questions = questions;
          setQuiz(quiz);
        });
      })
      .catch((error) => {
        alert(error.message);
      })
      .finally(() => console.log("Get terminé"));
  }

  useEffect(() => {
    fetchQuiz();
  }, []);

  const [newQuestion, setNewQuestion] = useState({
    label: "",
    answers: [
      {
        label: "",
        correct: false,
      },
    ],
  });

  useEffect(() => {
    if (newQuestion.label !== "") {
      dbQuestions
        .post(undefined, newQuestion)
        .then(() => fetchQuiz())
        .catch((error) => alert(error.message))
        .finally(() => console.log("Post terminé"));
    }
  }, [newQuestion]);

  const handleQuestionSubmit = (e) => {
    e.preventDefault();

    const checkboxes = document.querySelectorAll(
      '#questionForm input[type="checkbox"]'
    );

    const formQuestionData = new FormData(e.target);
    if (Array.from(checkboxes).some((checkbox) => checkbox.checked)) {
      setNewQuestion({
        label: formQuestionData.get("questionLabel"),
        quiz: { id },
        answers: [
          {
            label: formQuestionData.get("answer1"),
            correct: document.getElementById("checkAnswer1").checked
              ? true
              : false,
          },
          {
            label: formQuestionData.get("answer2"),
            correct: document.getElementById("checkAnswer2").checked
              ? true
              : false,
          },
          {
            label: formQuestionData.get("answer3"),
            correct: document.getElementById("checkAnswer3").checked
              ? true
              : false,
          },
          {
            label: formQuestionData.get("answer4"),
            correct: document.getElementById("checkAnswer4").checked
              ? true
              : false,
          },
        ],
      });
    } else {alert("Au moins une réponse doit-être vraie.")}
  };

  console.log("nouvelle question:");
  console.log(newQuestion);
  console.log(quiz);

  const deleteQuestion = (id) => {
    dbQuestions
      .delete("/" + id)
      .then(() => {
        console.log(`Question ${id} supprimée`);
        fetchQuiz();
      })
      .catch((error) => console.log(error.message));
  };

  if (!quiz) {
    return (
      <>
        <h1>Quiz introuvable!</h1>
      </>
    );
  }

  return (
    <>
      <h1>{quiz.label}</h1>
      <p className='text-sm'>
        Catégorie.s :{" "}
        {quiz.categories.map((cat) => (
          <span key={cat.id}>{cat.label}</span>
        ))}
      </p>
      <p className='text-sm'>par : {quiz.user.username}</p>
      <h1>Les questions :</h1>
      <div className='m-3'>
        {quiz.questions.map((q) => (
          <div key={q.id}>
            <h2 className='underline'>{q.label} :</h2>
            <button
              onClick={() => {
                deleteQuestion(q.id);
              }}
            >
              Supprimer cette question
            </button>
            <ul>
              {q.answers.map((a) => (
                <div className='m-1' key={a.id}>
                  <li className={a.correct ? "text-green-400" : "text-red-400"}>
                    {a.label}
                  </li>
                </div>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <form onSubmit={handleQuestionSubmit} className='m-5' id='questionForm'>
        <label>Question:</label>
        <br />
        <input type='text' name='questionLabel' placeholder='La question' />
        <br />
        <div className='mt-3'>
          <label>Réponses:</label>
          <br />
          <input type='text' name='answer1' placeholder='Réponse A' />
          <p className='text-sm'>
            C'est une bonne réponse <input type='checkbox' id='checkAnswer1' />
          </p>

          <br />
          <input type='text' name='answer2' placeholder='Réponse B' />
          <p className='text-sm'>
            C'est une bonne réponse <input type='checkbox' id='checkAnswer2' />
          </p>

          <br />
          <input type='text' name='answer3' placeholder='Réponse C' />
          <p className='text-sm'>
            C'est une bonne réponse <input type='checkbox' id='checkAnswer3' />
          </p>

          <br />
          <input type='text' name='answer4' placeholder='Réponse D' />
          <p className='text-sm'>
            C'est une bonne réponse <input type='checkbox' id='checkAnswer4' />
          </p>

          <br />
        </div>
        <button type='submit' className='btn btn-accent'>
          Ajouter la question
        </button>
      </form>
    </>
  );
}

export default EditQuiz;
