import { useState, useEffect } from "react"
import ApiService from "../service/ApiService"

function AllQuiz() {
    const dbQuiz = new ApiService("http://localhost:8080/quiz")

    const [quiz, setQuiz] = useState([]);

    useEffect( () => {
        dbQuiz.get()
            .then((response) =>{
                setQuiz(response.content)
            })
            .catch((error) =>{
                // Ici: Ajustez en fonction de comment on souhaite traîter notre erreur
                alert(error.message)
            })
            // finally: s'exécutera après avoir reçu la réponse ou un retour d'erreur. Dans tous les cas,
            // il s'exécutera
            .finally( () => console.log('Get terminé'))
    },[]);

console.log(quiz);

    return (
        <>
        <h1>Liste de tous les quiz :</h1>
        <div className="p-5">
        <table className="table table-zebra">
            <thead>
                <th>Label</th>
                <th>Auteur</th>
            </thead>
            <tbody>
                {quiz.map((q)=>(
                    <tr key={q.id}>
                        <td>{q.label}</td>
                        <td>{q.user ? q.user.username : 'N/A'}</td>
                    </tr>
                )
                )}
            </tbody>
        </table>
        <a href="/newquiz"><button className="btn btn-primary p-3">Ajouter un quiz!</button></a>
        </div>
        </>
    )
}

export default AllQuiz