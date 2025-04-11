export const calculateRankingByUTR = (loguedUserUtr: string, users: { utr: string }[]): string => {
    // aqui necesito calcular la posicion del usuario logueado en el ranking el loguedUserUtr es el utr del usuario logueado
    // y users es un array de usuarios donde solo es importante el utr de cada usuario
     const userUtrNumber = parseFloat(loguedUserUtr);
     const sortedUsers = users.map(user => parseFloat(user.utr)).sort((a, b) => b - a);
     const rankingPosition = sortedUsers.indexOf(userUtrNumber) + 1;
     console.log("rankingPs:",rankingPosition)
     
     return String(rankingPosition);
 }