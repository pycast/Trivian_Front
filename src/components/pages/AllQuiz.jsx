import { useState, useEffect } from "react";
import ApiService from "../service/ApiService";

function AllQuiz() {
  const dbQuiz = new ApiService("http://localhost:8080/quiz");
  const [quiz, setQuiz] = useState([]);

  const dbCat = new ApiService("http://localhost:8080/category");
  const [categories, setCategories] = useState([]);

  function fetchData() {
    dbQuiz
      .get()
      .then((response) => {
        setQuiz(response.content);
      })
      .catch((error) => {
        // Ici: Ajustez en fonction de comment on souhaite traîter notre erreur
        alert(error.message);
      })
      // finally: s'exécutera après avoir reçu la réponse ou un retour d'erreur. Dans tous les cas,
      // il s'exécutera
      .finally(() => console.log("Get terminé"));
  }

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    dbCat
      .get()
      .then((response) => {
        setCategories(response.content);
      })
      .catch((error) => {
        alert(error.message);
      })
      .finally(() => console.log("Get terminé"));
  }, []);

  const [newQuiz, setNewQuiz] = useState({
    categories: {},
    label: "",
    user: { id: 1 },
  });

  useEffect(() => {
    if (newQuiz.label !== "") {
      dbQuiz
        .post(undefined, newQuiz)
        .then(() => fetchData())
        .catch((error) => alert(error.message))
        .finally(() => console.log("Post terminé"));
    }
  }, [newQuiz]);

  const handleQuizSubmit = (e) => {
    e.preventDefault();

    const formQuizData = new FormData(e.target);

    const formCategories = [];

    const checkboxes = document.querySelectorAll(
      "#quizForm input[type=checkbox]:checked"
    );

    console.log(checkboxes);

    checkboxes.forEach(function (checkbox) {
      formCategories.push({ id: checkbox.name });
    });

    console.log(formCategories);

    setNewQuiz({
      categories: formCategories,
      label: formQuizData.get("quizlabel"),
      user: { id: 1 },
    });
  };

  console.log(newQuiz);

  const [newCat, setNewCat] = useState({
    label: "",
  });

  useEffect(() => {
    if (newCat.label !== "") {
      dbCat
        .post(undefined, newCat)
        .then(() => fetchData())
        .catch((error) => alert(error.message))
        .finally(() => console.log("Post terminé"));
    }
  }, [newCat]);

  const handleCatSubmit = (e) => {
    e.preventDefault();

    const formCatData = new FormData(e.target);

    setNewCat({
      label: formCatData.get("catlabel"),
    });
  };

  const deleteQuiz = (id) => {
    dbQuiz
      .delete("/" + id)
      .then(() => {
        console.log(`Quiz ${id} supprimé`);
        fetchData();
      })
      .catch((error) => console.log(error.message));
  };

  console.log(quiz);
  return (
    <>
      <h1>Liste de tous les quiz :</h1>
      <div className='p-5'>
        <table className='table table-zebra'>
          <thead>
            <th>Label</th>
            <th>Catégorie.s</th>
            <th>Auteur</th>
            <th>Edit</th>
          </thead>
          <tbody>
            {quiz.map((q) => (
              <tr key={q.id}>
                <td>
                  <a href={`/quiz/${q.id}`}>{q.label}</a>
                </td>
                <td>
                  {q.categories.map((c) => (
                    <div key={c.id}>{c.label}</div>
                  ))}
                </td>
                <td>{q.user ? q.user.username : "N/A"}</td>
                <td>
                  <a href={`/quiz/edit/${q.id}`}>
                    <button className='btn btn-warning'>Modifier</button>
                  </a>
                  <button
                    className='btn btn-error'
                    onClick={() => {
                      deleteQuiz(q.id);
                    }}
                  >
                    Supprimer
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className='mt-5'>
        <h1>Nouveau quiz:</h1>
        <form onSubmit={handleQuizSubmit} id='quizForm'>
          <div>
            <legend className='font-bold'>Catégorie.s:</legend>
            <div className='columns-3'>
              {categories.map((c) => (
                <div key={c.id}>
                  <input type='checkbox' name={c.id} key={c.id} />
                  <label>{c.label}</label>
                </div>
              ))}
            </div>
          </div>
          <br />
          <input type='text' placeholder='Nom du quiz' name='quizlabel' />
          <br />
          <button type='submit' className='btn btn-accent mt-5'>
            Créer le quiz
          </button>
        </form>
      </div>

      <div className='mt-5'>
        <h1>Nouvelle catégorie:</h1>
        <form onSubmit={handleCatSubmit}>
          <br />
          <input type='text' placeholder='Nouvelle catégorie' name='catlabel' />
          <br />
          <button type='submit' className='btn btn-accent mt-5'>
            Ajouter la catégorie
          </button>
        </form>
      </div>
    </>
  );
}

export default AllQuiz;
