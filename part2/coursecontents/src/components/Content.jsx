import Parts from "./Parts";
import Total from "./Total";

export default function Content({ parts }) {

    return (
        <div>
            <ul>
                {
                    parts.map((part) => {
                        return (<Parts key={part.id} part={part} />)
                    })
                }
            </ul>
            <Total parts={parts} />
        </div>
    )
}
