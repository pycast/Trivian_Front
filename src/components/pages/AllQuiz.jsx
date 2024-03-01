import { useState, useEffect } from "react";
import React from "react";
import ReactModal from "react-modal";
import { Link } from "react-router-dom";
import { httpClient } from "../service/http.client";

function AllQuiz() {
  let userSessionData = undefined;

  const storedUserSessionData = sessionStorage.getItem('LOGIN_RESP');

  if (storedUserSessionData) {
    userSessionData = JSON.parse(storedUserSessionData);
  } else {
  console.log('aucun user connecté');    }

  const [quizModalOpen, setQuizIsOpen] = React.useState(false);
  function openQuizModal() {
    setQuizIsOpen(true);
  }
  function closeQuizModal() {
    setQuizIsOpen(false);
  }

  const [CatModalOpen, setCatIsOpen] = React.useState(false);
  function openCatModal() {
    setCatIsOpen(true);
  }
  function closeCatModal() {
    setCatIsOpen(false);
  }

  const [quiz, setQuiz] = useState([]);
  const [categories, setCategories] = useState([]);

  function fetchData() {
    httpClient.api
      .get("quiz")
      .then((response) => {
        setQuiz(response.content);
      })
      .catch((error) => {
        alert(error.message);
      })
      .finally(() => console.log("Get terminé"));
  }

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    httpClient.api
      .get('category')
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
    user: {id:1},
  });

  const handleQuizSubmit = (e) => {
    e.preventDefault();
    const formQuizData = new FormData(e.target);
    const formCategories = [];
    const checkboxes = document.querySelectorAll(
      "#quizForm input[type=checkbox]:checked"
    );
    checkboxes.forEach(function (checkbox) {
      formCategories.push({ id: +checkbox.name });
    });
    setNewQuiz({
      categories: formCategories,
      label: formQuizData.get("label"),
      user: { id: userSessionData?.user.id || 0 },
    });
    console.log(Object.fromEntries(new FormData(e.target).entries()));
    httpClient.api
    .post("quiz", newQuiz)
    .then(() => fetchData())
    .catch((error) => alert(error.message))
    .finally(() => console.log("Post terminé"));
    closeQuizModal();
  };

  console.log(newQuiz);

  const handleCatSubmit = (e) => {
    e.preventDefault();
    httpClient.api
        .post("category", Object.fromEntries(new FormData(e.target).entries()))
        .then(() => fetchData())
        .catch((error) => alert(error.message))
        .finally(() => console.log("Post terminé"));
    closeCatModal();
  };

  const deleteQuiz = (id) => {
    httpClient.api
      .delete(`quiz/${id}`)
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
      <div className="p-5">
        <table className="table table-zebra">
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
                  <Link to={`/quiz/${q.id}`}>{q.label}</Link>
                </td>
                <td>
                  {q.categories.map((c) => (
                    <div key={c.id}>{c.label}</div>
                  ))}
                </td>
                <td>{q.user ? q.user.username : "N/A"}</td>
                <td>
                  <Link to={`/quiz/edit/${q.id}`}>
                    <button className="btn btn-warning">Modifier</button>
                  </Link>
                  <button
                    className="btn btn-error"
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
      <button onClick={openQuizModal} className="btn btn-primary">
        Ajouter un quiz
      </button>

      <ReactModal
        isOpen={quizModalOpen}
        onRequestClose={closeQuizModal}
        contentLabel="Add Quiz"
        ariaHideApp={false}
      >
        <div>
          <h1>Nouveau quiz:</h1>
          <form onSubmit={handleQuizSubmit} id="quizForm">
            <div>
              <legend className="font-bold">Catégorie.s:</legend>
              <div className="columns-3">
                {categories.map((c) => (
                  <div key={c.id}>
                    <input type="checkbox" name={c.id} key={c.id} />
                    <label>{c.label}</label>
                  </div>
                ))}
              </div>
            </div>
            <br />
            <input type="text" placeholder="Nom du quiz" name="label" />
            <br />
            <button type="submit" className="btn btn-accent mt-5">
              Créer le quiz
            </button>
          </form>
        </div>
      </ReactModal>
      <button onClick={openCatModal} className="btn btn-accent">
        Ajouter une catégorie
      </button>

      <ReactModal
        isOpen={CatModalOpen}
        onRequestClose={closeCatModal}
        contentLabel="Add Category"
        ariaHideApp={false}
      >
        <div>
          <h1>Nouvelle catégorie:</h1>
          <form onSubmit={handleCatSubmit}>
            <br />
            <input
              type="text"
              placeholder="Nouvelle catégorie"
              name="label"
              id="categorylabel"
            />
            <br />
            <button type="submit" className="btn btn-accent mt-5">
              Ajouter la catégorie
            </button>
          </form>
        </div>
      </ReactModal>
    </>
  );
}

export default AllQuiz;
