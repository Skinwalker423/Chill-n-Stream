

/*
This is an example snippet - you should consider tailoring it
to your service.
*/

async function fetchGraphQL(operationsDoc, operationName, variables) {
  const result = await fetch(
    "https://ethical-llama-12.hasura.app/v1/graphql",
    {
      method: "POST",
      body: JSON.stringify({
        query: operationsDoc,
        variables: variables,
        operationName: operationName
      }),
      headers: {
        'conent-type': "application/json",
        'x-hasura-admin-secret': process.env.HASHURA_SECRET_KEY
      }
    }
  );

  return await result.json();
}

const operationsDoc = `
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

function fetchMyQuery() {
  return fetchGraphQL(
    operationsDoc,
    "MyQuery",
    {}
  );
}

export async function startFetchMyQuery() {
  const { errors, data } = await fetchMyQuery();

  if (errors) {
    // handle those errors like a pro
    console.error(errors);
  }

  // do something great with this precious data
  return data;
}
