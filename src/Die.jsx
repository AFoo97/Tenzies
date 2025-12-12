export default function Die (props) {
    const styles = {
        backgroundColor: props.isHeld ? "#59E391" : "white"
    }
    
    return (
        <button 
            className="die" 
            style={styles}
            onClick={props.hold}
            aria-label={`Die with value ${props.value} is ${props.isHeld ? 'held' : 'not held'}`}
            aria-pressed={props.isHeld}
            aria-live={"polite"}
        >
            {props.value}
        </button>
    )

}