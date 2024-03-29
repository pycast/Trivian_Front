import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { httpClient } from "../service/http.client";

function DisplayQuiz() {
  let { id } = useParams();
  const [quiz, setQuiz] = useState();
  const [answers, setAnswers] = useState();

  useEffect(() => {
    httpClient.api
      .get(`quiz/${id}`)
      .then((response) => {
        setQuiz(response);
      })
      .catch((error) => {
        alert(error.message);
      })
      .finally(() => console.log("Get terminé"));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    httpClient.api
      .get(`questions/quiz/${id}`)
      .then((response) => {
        setAnswers(
          response.map((q) => {
            return {
              id: q.id,
              correct: q.answers.filter((response) => response.correct),
            };
          })
        );
      })
      .catch((error) => {
        alert(error.message);
      })
      .finally(() => {
        console.log("Réponses du quiz ");
        console.log(answers);
      });

    let formData = new FormData(e.target);
    let arrayFormData = [];

    for (let [key, value] of formData.entries()) {
      arrayFormData.push({ key, value });
    }

    console.log("Réponses du formulaire ");
    console.log(arrayFormData);

    answers.map((a)=>{
      console.log(a);
    });

    arrayFormData.map((data)=>{
      console.log(data);
    })

  

  };

  if (!quiz) {
    return (
      <>
        <h1>Quiz introuvable!</h1>
        <Link to='/quiz/all'>
          <button className='btn btn-primary'>
            Retour à la liste des quiz
          </button>
        </Link>
      </>
    );
  } else if (quiz.questions.length === 0) {
    return (
      <>
        <h1>Ce quiz n'a pas encore de questions!</h1>
        <Link to='/quiz/all'>
          <button className='btn btn-primary'>
            Retour à la liste des quiz
          </button>
        </Link>
        <Link to={`/quiz/edit/${id}`}>
          <button className='btn btn-warning'>Ajouter des questions</button>
        </Link>
      </>
    );
  }

  return (
    <>
      <Link to='/quiz/all'>
        <button className='btn btn-primary'>Retour à la liste des quiz</button>
      </Link>

      <h1>{quiz.label}</h1>
      <p className='text-sm'>
        Catégorie.s :{" "}
        {quiz.categories.map((cat) => (
          <span key={cat.id}>{cat.label} </span>
        ))}
      </p>
      <p className='text-sm'>par : {quiz.user.username}</p>

      <form className='mt-5' onSubmit={handleSubmit}>
        {quiz.questions.map((q) => (
          <div key={q.id} className='mt-3'>
            <h2 className='font-bold'>{q.label} :</h2>
            <div className='columns-2'>
              {q.answers.map((a) => (
                <div key={a.id}>
                  <input type='checkbox' name={a.id} id={`check${a.id}`} />
                  <label htmlFor={`check${a.id}`}>{a.label}</label>
                </div>
              ))}
            </div>
          </div>
        ))}
        <input type='submit' value='envoyer' className='btn btn-accent' />
      </form>
    </>
  );
}

export default DisplayQuiz;
