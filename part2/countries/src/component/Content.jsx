import Country from "./Country"

export default function Content({ countries, setFilter }) {
    if (!countries) return null
    console.log(countries.length)

    if (countries.length > 1 && countries.length < 10) {
        console.log(countries.length, countries)
        return (
            <div>
                {countries.map(countri => {
                    return <li key={countri.name.common}>{countri.name.common}  <button onClick={() => setFilter([countri])}>show</button> </li>
                })}
            </div>
        )
    }

    if (countries.length === 1) {
        console.log(countries)
        return < Country country={countries[0]} />

    }
}
