import { useState, useEffect } from "react";
import ApiService from "../service/ApiService";
import { useParams } from "react-router-dom";

function DisplayQuiz() {
  let { quizId } = useParams();

  const dbQuiz = new ApiService(`http://localhost:8080/quiz/${quizId}`);

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

  console.log(quiz);
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
      <div className="m-3">
        {quiz.questions.map((q) => (
          <div key={q.id}>
            <h2 className="underline">{q.label} :</h2>
            {q.answers.map((a) => (
              <div className="m-1" key={a.id}>
                <p>{a.label}</p>
              </div>
            ))}
          </div>
        ))}
      </div>

      <p>Ajouter une question :</p>
    </>
  );
}

export default DisplayQuiz;
