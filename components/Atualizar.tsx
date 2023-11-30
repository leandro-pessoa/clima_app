// imports dos componentes estilizados
import { Touch } from "../styles/atualizar-styles"
import { StyledText } from "../styles/main-styles"

// import de outros componentes
import { View } from "react-native"

// import do ícone
import EvilIcon from 'react-native-vector-icons/EvilIcons'

// tipagem dos props
interface Props {
    func: () => void
}

// roda a função '' quando o usuário tocar no botão
export default function Atualizar(props: Props): JSX.Element{

    return (
        <Touch
            onPress={()=>props.func()}
            underlayColor={'#00000031'}
        >
            <View>
                <StyledText>
                    <EvilIcon name='refresh' color='#fff' size={28}/>
                    Atualizar
                </StyledText>
            </View>
        </Touch>
    )
}