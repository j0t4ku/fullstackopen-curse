export const Notification = ({ message }) => {
    if (!message) {
        return null
    }

    const color = message.tipo === "success" ? "green" : message.tipo === "error" ? "red" : "blue"


    const notificationStyle = {
        color: color,
        background: "lightgrey",
        fontSize: "20px",
        borderStyle: "solid",
        borderRadius: "5px",
        padding: "10px",
        marginBottom: "S",
    }
    return (

        <div style={notificationStyle}>
            {message.message ? message.message : null}
        </div >
    )
}