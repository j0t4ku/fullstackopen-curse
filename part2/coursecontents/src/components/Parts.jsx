
export default function Parts({ part }) {
    return (
        <li key={part.id}>{part.name} {part.exercises}</li>
    )
}
