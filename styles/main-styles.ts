// import dos módulos
import styled from 'styled-components/native'

// declaração dos componentes estilizados

const sombra = 'text-shadow: 1px 1px 5px rgba(0, 0, 0, 0.400)'

const StyledSafeAreaView = styled.SafeAreaView`
    flex: 1;
    background-color: #072142;
    justify-content: space-between;
`

const StyledImageBackground = styled.ImageBackground`
    flex: 1;
`

const LoadingBox = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
`

const Header = styled.View`
    align-items: center;
    padding-top: 40px;
`

const SectionSwitch = styled.View`
    width: 100%;
    flex-direction: row;
    justify-content: flex-end;
    padding-right: 20px;
`

const Modo = styled.Text`
    color: white;
    font-weight: 200;
    font-size: 20px;
`

const Tittle = styled.Text`
    font-size: 35px;
    font-weight: 200;
    color: white;
    ${sombra}
`

const Main = styled.View`
    height: 80%;
    align-items: center;
    justify-content: center;
`

const StyledText = styled.Text`
    font-size: 25px;
    font-weight: 200;
    color: white;
    ${sombra}
`

const SectionInfos = styled.View`
    display: flex;
    flex-direction: row;
    width: 80%;
    margin-top: 50px;
    background-color: #00000021;
    border-radius: 10px;
    padding: 10px;
    gap: 15px;

`

const Unit = styled.View`
    gap: 10px;
`

const Value = styled.View`
    gap: 10px;
`

const Info = styled.Text`
    color: white;
    font-size: 20px;
    font-weight: 200;
    ${sombra}
`

const Footer = styled.View`

`

//export dos componentes

export { 
    StyledSafeAreaView,
    StyledImageBackground,
    LoadingBox,
    Header,
    SectionSwitch,
    Modo,
    Tittle,
    Main,
    StyledText,
    SectionInfos,
    Unit,
    Value,
    Info,
    Footer
}