
export async function fetchHasuraGraphQL(operationsDoc, operationName, variables) {
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
        'x-hasura-admin-secret': process.env.NEXT_PUBLIC_HASHURA_SECRET_KEY
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
    {}
  )
}

function fetchMyQuery() {
  const usersDoc = `
  query MyQuery {
  users {
    id
    publicAddress
    issuer
    email
    created_at
  }
}
`;
  return fetchHasuraGraphQL(
    usersDoc,
    "MyQuery",
    {}
  );
}



