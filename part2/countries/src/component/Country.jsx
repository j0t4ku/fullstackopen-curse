
export default function Country({ country }) {
    const len = Object.values(country.languages)
    return (
        <div>
            <section>
                <h2>{country.name.common}</h2>
                <p>
                    Capital: {country.capital[0]} <br />
                    Area: {country.area}
                </p>
                <h3>Lenguages:</h3>
                <ul>
                    {len.map(leng => <li key={leng}>{leng}</li>)}
                </ul>
                <img src={country.flags.png} />
            </section>
        </div>
    )
}
