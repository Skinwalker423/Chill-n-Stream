
export async function fetchHasuraGraphQL(operationsDoc, operationName, variables, token) {
  const result = await fetch(
    process.env.NEXT_PUBLIC_HASURA_FETCH_URL,
    {
      method: "POST",
      body: JSON.stringify({
        query: operationsDoc,
        variables: variables,
        operationName: operationName
      }),
      headers: {
        'conent-type': "application/json",
        'Authorization': `Bearer ${token}`
        // 'x-hasura-admin-secret': process.env.NEXT_PUBLIC_HASHURA_SECRET_KEY
      }
    }
  );

  return await result.json();
}




export async function createUserStats(id, userId, videoId, watched = false, fav = null, ){
  return await fetchHasuraGraphQL(
    `
    mutation MyMutation {
      insert_stats(objects: {favorited: ${fav}, id: ${id}, userId: ${userId}, videoId: ${videoId}, watched: ${watched}}) {
        affected_rows
    }
  }
`,
    "MyMutation",
    {},

  )
}

export async function fetchMyQuery(token) {
  const usersDoc = `
  query MyQuery {
    users(where: {issuer: {_eq: "did:ethr:0x194254B69E0951BA076D1077e1E4EF644A502D3A"}}) {
      created_at
      email
      publicAddress
      id
      issuer
    }
  }
`;
  return fetchHasuraGraphQL(
    usersDoc,
    "MyQuery",
    {},
    token,
  );
}

export async function startFetchMyQueryUserCheck(token){
  const {errors, data} = await fetchMyQuery(token);
  if(errors){
    console.error('error finding users', errors);
  }

  return data?.users?.length === 0;
}



