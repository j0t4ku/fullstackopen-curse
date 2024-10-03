
export default function PersonForm({ addPerson, newName, newPhone, handleName, handlePhone }) {
    return (
        <form onSubmit={addPerson}>
            <div>
                name: <input value={newName} onChange={handleName} />
            </div>
            <div>
                number: <input value={newPhone} onChange={handlePhone} />
            </div>
            <div>
                <button type="submit">add</button>
            </div>
        </form>
    )
}
