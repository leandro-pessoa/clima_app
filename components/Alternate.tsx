// import dos módulos
import { Switch } from "react-native"

// tipagem dos props
interface Props {
    fahrenheit: boolean,
    setFahrenheit: () => void
}

export default function Alternate(props: Props): JSX.Element{
    return (
        <>
            <Switch 
                value={props.fahrenheit}
                onValueChange={()=>props.setFahrenheit()}
            />
        </>
    )
}