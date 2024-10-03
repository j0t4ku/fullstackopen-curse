import Content from "./Content";
import Header from "./Header";

export default function Course({ courses }) {
    console.log(courses)
    return (
        <div>
            {
                courses.map((course) => {
                    return (
                        <div key={course.id}>
                            <Header name={course.name} />
                            <Content parts={course.parts} />
                        </div>
                    )
                })
            }
        </div>
    )
}
