export async function createUser(email, issuer, publicAddress, token){

  const operationsDoc = `
  mutation createNewUser($issuer: String!, $email: String!, $publicAddress: String!) {
    insert_users(objects: {email: $email, issuer: $issuer, publicAddress: $publicAddress}) {
      returning {
        email
        id
        issuer
      }
    }
  }
`;
  
  const response =  await fetchHasuraGraphQL(
      operationsDoc,
      "createNewUser",
      {
        issuer,
        email,
        publicAddress,
      },
      token,
    );
    
    return response;
}
export async function createUserStats(token, {issuer, videoId, favorited = 0, watched = true} ){

  const operationsDoc = `
  mutation createNewUserStats($issuer: String!, $videoId: String!, $favorited: Int!, $watched: Boolean!) {
    insert_stats(objects: {
      favorited: $favorited, 
      userId: $issuer, 
      watched: $watched, 
      videoId: $videoId
    }) {
      returning {
        favorited
        watched
        userId
        videoId
      }
    }
  }
`;
  
  const response =  await fetchHasuraGraphQL(
      operationsDoc,
      "createNewUserStats",
      {
        issuer,
        videoId,
        favorited,
        watched,
      },
      token,
    );
    
    return response;
}

export async function updateUserStats(token, {issuer, videoId, favorited, watched}){

  const operationsDoc = `
  mutation updateUserStats($issuer: String!, $videoId: String!, $favorited: Int!, $watched: Boolean!) {
    update_stats(where: {userId: {_eq: $issuer}, videoId: {_eq: $videoId}}, _set: {favorited: $favorited, watched: $watched}) {
      returning {
        favorited
        videoId
        watched
      }
    }
  }
`;
  
  const response =  await fetchHasuraGraphQL(
      operationsDoc,
      "updateUserStats",
      {
        issuer,
        videoId,
        favorited,
        watched,
      },
      token,
    );
    
    return response;
}



export async function fetchMyQuery(token, issuer) {
  
  const usersDoc = `
  query NewUserCheck($issuer: String!) {
    users(where: {issuer: {_eq: $issuer}}) {
      email
      id
      issuer
    }
  }
`;
  
  const response = await fetchHasuraGraphQL(
    usersDoc,
    "NewUserCheck",
    {
      "issuer":issuer,
    },
    token,
  );

  return response?.data?.users.length > 0;
}
export async function fetchUserStatsVideo(token, issuer, videoId) {
  const usersStatsDoc = `
  query UserStatsCheck($issuer: String!, $videoId: String!) {
    stats(where: {userId: {_eq: $issuer}, videoId: {_eq: $videoId}}) {
      favorited
      userId
      videoId
      watched
    }
  }
`;

  const response = await fetchHasuraGraphQL(
    usersStatsDoc,
    "UserStatsCheck",
    {
      "issuer":issuer,
      "videoId": videoId,
    },
    token,
  );

  const {data, errors} = await response;
  if(errors){
    console.log('problem with fetchHasuraGraphQL', errors);
  }

  return data?.stats;

  }
  
export async function fetchWatchedVideosByUser(token, issuer) {
 
  const watchedStatsDoc = `
  query WatchedVideos($issuer: String!) {
    stats(where: {userId: {_eq: $issuer}, watched: {_eq: true}}) {
      watched
      videoId
      favorited
    }
  }
`;

  const response = await fetchHasuraGraphQL(
    watchedStatsDoc,
    "WatchedVideos",
    {
      issuer,
    },
    token,
  );
    console.log("fetched watched vids data",response);
  return response?.data?.stats;
}

export async function fetchFavoriteVideosByUser(token, issuer) {
 
  const favoritedStatsDoc = `
  query FavoriteVideos($issuer: String!) {
    stats(where: {userId: {_eq: $issuer}, favorited: {_eq: 1}}) {
      
      videoId
      favorited
    }
  }
`;

  const response = await fetchHasuraGraphQL(
    favoritedStatsDoc,
    "FavoriteVideos",
    {
      issuer,
    },
    token,
  );
    console.log("fetched favorite vids data",response);
  return response?.data?.stats;
}


async function fetchHasuraGraphQL(operationsDoc, operationName, variables, token) {
  const result = await fetch(
    process.env.NEXT_PUBLIC_HASURA_FETCH_URL,
    {
      method: "POST",
      headers: {
        'conent-type': "application/json",
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({
        query: operationsDoc,
        variables: variables,
        operationName: operationName
      }),
      
    }
  );

  

  const data = await result.json();
  return data;
}

