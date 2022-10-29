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
    console.log({ response, issuer });
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


// export async function startFetchMyQueryUserCheck(token, issuer){
//   console.log({token});

//   const {errors, data} = await fetchMyQuery(token, issuer);
//   console.log({data});
//   if(errors){
//     console.error('error finding users', errors);
//   }

//   return data?.users?.length === 0;
// }

// export async function startInsertUser(email, issuer, publicAddress, token){
//   try{
//     const res = await createUser(email, issuer, publicAddress, token);
//     console.log("create user res:",res);
  
//     return res?.data?.users.length === 0;
    
//   }catch(err){
//     console.error('error creating a user', errors);

//   }
  
// }



