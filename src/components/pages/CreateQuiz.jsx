import { useState, useEffect } from "react";
import ApiService from "../service/ApiService";

// IL FAUT RELIER L'UTILISATEUR CONNECTE A LA FONCTION AU SET NEW QUIZ POUR L'ENREIGISTRER EN BASE, PAR DEFAUT CE SERA l'UTILISATEUR A L'ID 1


function CreateQuiz() {
  const dbQuiz = new ApiService("http://localhost:8080/quiz");

  const dbCat = new ApiService("http://localhost:8080/category");

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    dbCat
      .get()
      .then((response) => {
        setCategories(response.content);
      })
      .catch((error) => {
        // Ici: Ajustez en fonction de comment on souhaite traîter notre erreur
        alert(error.message);
      })
      // finally: s'exécutera après avoir reçu la réponse ou un retour d'erreur. Dans tous les cas,
      // il s'exécutera
      .finally(() => console.log("Get terminé"));
  }, []);

  const [newQuiz, setNewQuiz] = useState({
    categories: [],
    label: "",
    user: {"id":1},
  });

  useEffect( () => {
      if(newQuiz.label !== ""){
          dbQuiz.post(undefined, newQuiz)
          .then()
          .catch((error) => alert(error.message))
          .finally(()  => console.log('Post terminé'))
      }
  }, [newQuiz])

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    setNewQuiz({
      categories: formData.get("categories"),
      label: formData.get("label"),
      user: {"id":1}
    });
  };

  return (
    <>
      <h1>Nouveau quiz:</h1>
      <form onSubmit={handleSubmit}>
        <div>
            <legend className="font-bold">Catégorie.s:</legend>
          {categories.map((c) => (
            <div>
            <input type="checkbox" name={c.id} key={c.id}/>
              <label>{c.label}</label>
              </div>
           ))}
        </div>
        <br />
        <input type='text' placeholder='Nom du quiz' name='label' />
        <br />
        <button type="submit">Créer le quiz</button>
      </form>
    </>
  );
}

export default CreateQuiz;
