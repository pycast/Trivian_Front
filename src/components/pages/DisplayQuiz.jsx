import { useState, useEffect } from "react";
import ApiService from "../service/ApiService";
import { useParams } from "react-router-dom";

function DisplayQuiz() {
  let { id } = useParams();

  const dbQuiz = new ApiService(`http://localhost:8080/quiz/${id}`);

  const [quiz, setQuiz] = useState();

  useEffect(() => {
    dbQuiz
      .get()
      .then((response) => {
        setQuiz(response);
      })
      .catch((error) => {
        // Ici: Ajustez en fonction de comment on souhaite traîter notre erreur
        alert(error.message);
      })
      // finally: s'exécutera après avoir reçu la réponse ou un retour d'erreur. Dans tous les cas,
      // il s'exécutera
      .finally(() => console.log("Get terminé"));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    let formData = new FormData(e.target);

    let formDataObject = {};

    for (let [key, value] of formData.entries()) {
      formDataObject[key] = value;
    }

    console.log(formDataObject);
  };

  console.log(quiz);

  if (!quiz) {
    return (
      <>
        <h1>Quiz introuvable!</h1>
        <a href='/quiz/all'>
          <button className='btn btn-primary'>
            Retour à la liste des quiz
          </button>
        </a>
      </>
    );
  } else if (quiz.questions.length === 0) {
    return (
      <>
        <h1>Ce quiz n'a pas encore de questions!</h1>
        <a href='/quiz/all'>
          <button className='btn btn-primary'>
            Retour à la liste des quiz
          </button>
        </a>
      </>
    );
  }

  return (
    <>
      <a href='/quiz/all'>
        <button className='btn btn-primary'>Retour à la liste des quiz</button>
      </a>

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
                  {a.label}
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
