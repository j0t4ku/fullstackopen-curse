
export default function Content({ persons, handleDelete }) {
    return (
        <div >
            {
                persons.map((person, index) => {
                    return <div key={index}>
                        <p >{person.name} {person.number} <button type="button" onClick={() => handleDelete(person.id)}> Delete</button></p>

                    </div>
                }
                )
            }
        </div >
    )
}
