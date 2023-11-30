// import da tipagem
import { ImageSourcePropType } from 'react-native'

// import do objeto que contém o require de cada imagem
import { imagens } from '../components/imagens'

// faz a definição de qual background estará ativo, de acordo com a hora do dia e a condição climática
export const background = (sky: string): ImageSourcePropType => {

    // obtém a hora
    const date: Date = new Date()
    const hora: number = date.getHours()

    // faz a distinção entre dia e noite
    const noite: boolean = hora >= 18 || hora <= 4
    const dia: boolean = hora > 4 || hora < 18

    // condições
    if(sky == 'Clear' && noite){
      return imagens.ceu_limpo_noite
    }
    else if(sky == 'Rain'|| sky == 'Drizzle' && noite){
      return imagens.chuva_noite
    }
    else if(sky == 'Clouds' && noite){
      return imagens.ceu_nublado_noite
    }
    else if(sky == 'Clear' && dia){
      return imagens.ceu_limpo_dia
    }
    else if(sky == 'Rain' || sky == 'Drizzle' && dia){
      return imagens.chuva_dia
    }
    else if(sky == 'Clouds' && dia){
      return imagens.ceu_nublado_dia
    }
    else if(sky == 'Snow'){
      return imagens.neve
    }
    else if(sky == 'Mist'){
      return imagens.nublado
    }
    else if(sky == 'Thunderstorm'){
      return imagens.tempestade
    }
    else{
      return imagens.chuva_noite
    }
}   