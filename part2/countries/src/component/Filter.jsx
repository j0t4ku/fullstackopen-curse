
export default function Filter({ find, handleFind }) {
    return (
        <div>
            <p>find countries</p>
            <input type="text" name="filter" value={find} onChange={handleFind} />
        </div>
    )
}
