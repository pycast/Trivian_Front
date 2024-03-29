import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { httpClient } from "../service/http.client";

function EditQuiz() {
  let { id } = useParams();
  const [quiz, setQuiz] = useState();

  const [formData, setFormData] = useState({
    questionLabel: "",
    answer1: "",
    answer2: "",
    answer3: "",
    answer4: "",
  });

  function fetchQuiz() {
    httpClient.api
      .get(`quiz/${id}`)
      .then((quiz) => {
        httpClient.api.get(`questions/quiz/${quiz.id}`).then((questions) => {
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
      httpClient.api
        .post("questions", newQuestion)
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
      setFormData({
        questionLabel: "",
        answer1: "",
        answer2: "",
        answer3: "",
        answer4: "",
      });
    } else {
      alert("Au moins une réponse doit-être vraie.");
    }
  };

  console.log(quiz);

  const deleteQuestion = (id) => {
    httpClient.api
      .delete(`questions/${id}`)
      .then(() => {
        console.log(`Question ${id} supprimée`);
        fetchQuiz();
      })
      .catch((error) => console.log(error.message));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  if (!quiz) {
    return (
      <>
        <h1>Quiz introuvable!</h1>
        <Link to="/quiz/all">
          <button className="btn btn-primary">
            Retour à la liste des quiz
          </button>
        </Link>
      </>
    );
  }

  return (
    <>
      <Link to="/quiz/all">
        <button className="btn btn-primary">Retour à la liste des quiz</button>
      </Link>

      <h1>{quiz.label}</h1>
      <p className="text-sm">
        Catégorie.s :{" "}
        {quiz.categories.map((cat) => (
          <span key={cat.id}>{cat.label}</span>
        ))}
      </p>
      <p className="text-sm">par : {quiz.user.username}</p>
      <h1>Les questions :</h1>
      <div className="m-3">
        {quiz.questions.map((q) => (
          <div key={q.id}>
            <h2 className="underline">{q.label} :</h2>
            <button
              className="btn btn-warning"
              onClick={() => {
                deleteQuestion(q.id);
              }}
            >
              Supprimer cette question
            </button>
            <ul>
              {q.answers.map((a) => (
                <div className="m-1" key={a.id}>
                  <li className={a.correct ? "text-green-400" : "text-red-400"}>
                    {a.label}
                  </li>
                </div>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <form onSubmit={handleQuestionSubmit} className="m-5" id="questionForm">
        <label>Question:</label>
        <br />
        <input
          type="text"
          name="questionLabel"
          value={formData.questionLabel}
          onChange={handleChange}
          placeholder="La question"
        />
        <br />
        <div className="mt-3">
          <label>Réponses:</label>
          <br />
          <input
            type="text"
            name="answer1"
            value={formData.answer1}
            onChange={handleChange}
            placeholder="Réponse A"
          />
          <p className="text-sm">
            C'est une bonne réponse <input type="checkbox" id="checkAnswer1" />
          </p>

          <br />
          <input
            type="text"
            name="answer2"
            value={formData.answer2}
            onChange={handleChange}
            placeholder="Réponse B"
          />
          <p className="text-sm">
            C'est une bonne réponse <input type="checkbox" id="checkAnswer2" />
          </p>

          <br />
          <input
            type="text"
            name="answer3"
            value={formData.answer3}
            onChange={handleChange}
            placeholder="Réponse C"
          />
          <p className="text-sm">
            C'est une bonne réponse <input type="checkbox" id="checkAnswer3" />
          </p>

          <br />
          <input
            type="text"
            name="answer4"
            value={formData.answer4}
            onChange={handleChange}
            placeholder="Réponse D"
          />
          <p className="text-sm">
            C'est une bonne réponse <input type="checkbox" id="checkAnswer4" />
          </p>

          <br />
        </div>
        <button type="submit" className="btn btn-accent">
          Ajouter la question
        </button>
      </form>
    </>
  );
}

export default EditQuiz;
