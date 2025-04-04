const Buttons = (props) => {

    return (
        <button
            className={`border-4 text-lg p-1 rounded-xl transition duration-300 ${props.colorClass}`}
            onClick={props.onClick}
        >
          {props.show}
        </button>
    )
}

export default Buttons