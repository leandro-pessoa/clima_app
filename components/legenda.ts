// corrige alguns erros de tradução da api
// deixa a letra inicial em maiúscula
export const legenda = (desc: string): string => {
    switch(desc){
        case 'nublado': 
            return 'Nublado'
        case 'céu limpo':
            return 'Céu limpo'
        case 'céu pouco nublado':
            return 'Poucas nuvens'
        case 'nuvens quebradas':
            return 'Parcialmente nublado'
        case 'nuvens dispersas':
            return 'Nuvens dispersas'
        case 'chuva':
            return 'Chuva'
        case 'chuva de banho':
            return 'Chuva'
        case 'trovoada':
            return 'Trovoada'
        case 'neve':
            return 'Neve'
        case 'névoa':
            return 'Névoa'
        default:
            return desc
    }
}