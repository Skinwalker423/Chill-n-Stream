
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
export async function insertUserHasuraGraphQL(operationsDoc, operationName, variables, token) {
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


export async function createUser(email, issuer, publicAddress, token){
  const operationsDoc = `
  mutation MyMutation($email: String, $issuer: String, $publicAddress: String) {
    insert_users(objects: {email: $email, issuer: $issuer, publicAddress: $publicAddress}) {
      returning {
        email
        issuer
        publicAddress
      }
    }
  }
`;


  return insertUserHasuraGraphQL(
      operationsDoc,
      "NewUser",
      {
        email,
        issuer,
        publicAddress,
      },
      token,
    );
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

export async function fetchMyQuery(token, issuer) {
  const usersDoc = `
  query NewUserCheck($issuer: String!) {
    users(where: {issuer: {_eq: $issuer}}) {
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
    "NewUserCheck",
    {
      issuer,
    },
    token,
  );
}

export async function startFetchMyQueryUserCheck(token, issuer){

  const {errors, data} = await fetchMyQuery(token, issuer);
  if(errors){
    console.error('error finding users', errors);
  }
  return data?.users?.length === 0;
}

export async function startInsertUser(email, issuer, publicAddress, token){
  try{
    const res = await createUser(email, issuer, publicAddress, token);
    console.log("create user res:",res);
    console.log({email});
    console.log({publicAddress});
    console.log({email});


    if(res){
      return res.data;
    } 
  }catch(err){
    console.error('error creating a user', errors);
  }
  
}



