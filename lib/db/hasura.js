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
export async function createUserStats(issuer, videoId, token){

  const operationsDoc = `
  mutation createNewUserStats($issuer: String!, $videoId: String!) {
    insert_stats(objects: {favorited: 1, userId: $issuer, watched: false, videoId: $videoId}) {
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
      },
      token,
    );
    
    return response;
}

export async function updateUserStats(issuer, videoId, token){

  const operationsDoc = `
  mutation updateUserStats($issuer: String!, $videoId: String!) {
    update_stats(where: {userId: {_eq: $issuer}, videoId: {_eq: $videoId}}, _set: {favorited: 1}) {
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
      },
      token,
    );
    
    return response;
}



export async function fetchMyQuery(token, issuer) {
  console.log({issuer});
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
  console.log({issuer});
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

  return response?.data?.stats?.length > 0;
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

