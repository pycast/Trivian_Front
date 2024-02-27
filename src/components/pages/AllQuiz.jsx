import { useState, useEffect } from "react";
import ApiService from "../service/ApiService";

function AllQuiz() {

  const dbQuiz = new ApiService("http://localhost:8080/quiz");
  const [quiz, setQuiz] = useState([]);

  const dbCat = new ApiService("http://localhost:8080/category");
  const [categories, setCategories] = useState([]);

  useEffect(() => {
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
    categories: [],
    label: "",
    user: { id: 1 },
  });

  useEffect(() => {
    if (newQuiz.label !== "") {
      dbQuiz
        .post(undefined, newQuiz)
        .then((data)=>setQuiz((prevQuiz) => [...prevQuiz, data]))
        .catch((error) => alert(error.message))
        .finally(() => console.log("Post terminé"));
    }
  }, [newQuiz]);  
  
  const handleQuizSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    setNewQuiz({
      categories: formData.get("categories"),
      label: formData.get("label"),
      user: { id: 1 },
    });
  };

  const [newCat, setNewCat] = useState({
    label: "",
  });  

  useEffect(() => {
    if (newCat.label !== "") {
      dbCat
        .post(undefined, newQuiz)
        .then((data)=>setCategories((prevCat) => [...prevCat, data]))
        .catch((error) => alert(error.message))
        .finally(() => console.log("Post terminé"));
    }
  }, [newCat]);

  const handleCatSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    setNewCat({
      label: formData.get("label"),
    });
  };

  return (
    <>
      <h1>Liste de tous les quiz :</h1>
      <div className='p-5'>
        <table className='table table-zebra'>
          <thead>
            <th>Label</th>
            <th>Auteur</th>
            <th></th>
          </thead>
          <tbody>
            {quiz.map((q) => (
              <tr key={q.id}>
                <td>{q.label}</td>
                <td>{q.user ? q.user.username : "N/A"}</td>
                <td></td>
              </tr>
            ))}
          </tbody>
        </table>

      </div>
      <div className="mt-5">
      <h1>Nouveau quiz:</h1>
      <form onSubmit={handleQuizSubmit}>
        <div>
          <legend className='font-bold'>Catégorie.s:</legend>
          {categories.map((c) => (
            <div key={c.id}>
              <input type='checkbox' name={c.id} key={c.id} />
              <label>{c.label}</label>
            </div>
          ))}
        </div>
        <br />
        <input type='text' placeholder='Nom du quiz' name='label' />
        <br />
        <button type='submit' className='btn btn-primary mt-5'>
          Créer le quiz
        </button>
      </form>
      </div>

      <div className="mt-5">
      <h1>Nouvelle catégorie:</h1>
      <form onSubmit={handleCatSubmit}>
        <br />
        <input type='text' placeholder='Nouvelle catégorie' name='label' />
        <br />
        <button type='submit' className='btn btn-primary mt-5'>
          Ajouter la catégorie
        </button>
      </form>
      </div>
    </>
  );
}

export default AllQuiz;
