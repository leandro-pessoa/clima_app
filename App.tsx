// imports dos módulos 
import { Platform, PermissionsAndroid, StatusBar } from 'react-native'
import { useEffect, useState } from 'react'
import Geolocation from '@react-native-community/geolocation'
import axios from 'axios'
import SystemNavigationBar from 'react-native-system-navigation-bar'

// import dos componentes estilizados
import { 
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
  Info
} from './styles/main-styles'

// import de funções externas
import { background } from './components/background'
import { month } from './components/month'
import { legenda } from './components/legenda'

// import de outros componentes
import Atualizar from './components/Atualizar'
import Alternate from './components/Alternate'

export default function App(): JSX.Element{

  // altera a cor da barra de navegação (barra de baixo)
  SystemNavigationBar.setNavigationColor('translucent')

  // states dedicados às informações fornecidas pela api
  const [data, setData] = useState<any>(false)
  const [temp, setTemp] = useState<number>(0)
  const [sky, setSky] = useState<string>('')
  const [description, setDescription] = useState<any>(false)
  const [humidity, setHumidity] = useState<number>(0)
  const [speedW, setSpeedW] = useState<number>(0)
  const [tempMax, setTempMax] = useState<number>(0)

  // states dedicados ao feedback
  const [loading, setLoading] = useState<boolean>(false)
  const [netowrkError, setNetworkError] = useState<boolean>(false)
  const [noLocation, setNoLocation] = useState<boolean>(false)

  // state que define qual medição será utilizada
  const [fahrenheit, setFahrenheit] = useState<boolean>(false)

  // faz a requisição da api e seta os states dedicados às informações da api
  const getWeather = async (lat: number, lng: number): Promise<void> => {
    setLoading(true)
    try {

      // requisita as informações a uma api
      const res = await axios.get('http://api.openweathermap.org/data/2.5/weather', {
        params: {
          lat: lat,
          lon: lng,
          appid: 'bd00940a824f842d80dd7f7e2d459def',
          lang: 'pt',
          units: 'metric'
        }
      })

      // seta os states responsáveis por cada informação
      setTemp(res.data.main.temp)
      setData(res.data)
      setSky(res.data.weather[0].main)
      setDescription(res.data.weather[0].description)
      setHumidity(res.data.main.humidity)
      setSpeedW(res.data.wind.speed)
      setTempMax(res.data.main.temp_max)
      console.log(res.data)
      setNetworkError(false)
    }
    catch(err){
      setNetworkError(true)
    }
    setLoading(false)
  }

  // gera a latitude e longitude do usuário e as coloca na função 'getWeather'
  const getLocation = (): void => {
    try{
      Geolocation.getCurrentPosition(
        async (position) => {
          getWeather(position.coords.latitude, position.coords.longitude)
          setNoLocation(false)
        },
        error => {
          setNoLocation(true)
        }
      )
    }
    catch(err){
      
    }
  }

  // chama a função 'getLocation' (IOS)
  // faz o pedido de permissão e, caso concedida, chama a função 'getLocation' (Android)
  const callLocation = (): void => {
    if(Platform.OS === 'ios'){
      getLocation()
    }
    else{
      const requestLocationPermission = async () => {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Permissão de Acesso à Localização',
            message: 'Este aplicativo precisa acessar sua localização',
            buttonNeutral: 'Pergunte-me depois',
            buttonNegative: 'Cancelar',
            buttonPositive: 'Ok'
          }
        )
        if(granted === PermissionsAndroid.RESULTS.GRANTED){
          getLocation()
        }
        else{
          console.log('permissão negada')
        }
      }
      requestLocationPermission()
    }
  }

  // chama a função 'callLocation' quando o componente é criado (componentDidMount)
  useEffect(()=>{
      callLocation()
  }, [])

  // faz a conversão de Celsius para Fahrenheit
  const convert = (temp: number): number => {
    const fahrenheit: number = (temp * 9/5) + 32
    return fahrenheit
  }

  // faz a renderização de acordo com o state 'loading'
  const render = (): JSX.Element => {

    // gera o dia e o mês atuais
    const date: Date = new Date()
    const dia: number = date.getDate()
    const mes: number = date.getMonth() + 1

    if(loading == true){
      return (
        <LoadingBox>
          <StyledText>
            Carregando. . .
          </StyledText>
        </LoadingBox>
      )
    }
    else if(netowrkError == true){
      return(
        <LoadingBox>
          <StyledText>
            Sem conexão com a internet
          </StyledText>
          <Atualizar func={()=>getLocation()}/>
        </LoadingBox>
      )
    }
    else if(noLocation == true){
      return (
        <LoadingBox>
          <StyledText>
            Localização desativada
          </StyledText>
          <Atualizar func={()=>getLocation()}/>
        </LoadingBox>
      )
    }
    else{
      return (
        <>
          <Header>
            <SectionSwitch>
              <Modo>
                °C
              </Modo>
              <Alternate
                fahrenheit={fahrenheit}
                setFahrenheit={()=>setFahrenheit(!fahrenheit)}
              />
              <Modo>
                °F
              </Modo>
            </SectionSwitch>
            <Tittle>
              {data.name}
            </Tittle>
            <StyledText>
              {month(mes)} {dia}
            </StyledText>
          </Header>
          <Main>
            <StyledText
              style={{fontSize: 40}}
            >
              {
                fahrenheit ?
                convert(temp).toFixed(0)
                :
                temp.toFixed(0)
              }
              {
                fahrenheit ?
                '°F'
                :
                '°C'
              }
            </StyledText>
            <StyledText>
              {legenda(description)}
            </StyledText>
            <SectionInfos>
              <Unit>
                <Info>
                  Humidade:
                </Info>
                <Info>
                  Temperatura máxima:
                </Info>
                <Info>
                  Velocidade do vento:
                </Info>
              </Unit>
              <Value>
                <Info>
                  {humidity}%
                </Info>
                <Info>
                  {
                    fahrenheit ?
                    convert(temp).toFixed(0)
                    :
                    tempMax.toFixed(0)
                  }
                  {
                    fahrenheit ?
                    '°F'
                    :
                    '°C'
                  }
                </Info>
                <Info>
                  {speedW.toFixed(1)}Km/h
                </Info>
              </Value>
            </SectionInfos>
            <Atualizar func={()=>getLocation()}/>
          </Main>
        </>
      )
    }
  }

  return (
    <>
      <StatusBar translucent backgroundColor={'transparent'}/>
      <StyledSafeAreaView>
          <StyledImageBackground
            source={background(sky)}
          >
            {render()}
          </StyledImageBackground>
      </StyledSafeAreaView>
    </>
  )
}