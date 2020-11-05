// update-shopnote.js

const query = require("./utils/query");

const UPDATE_SHOPNOTE = `
    mutation($id: ID!, $name: String!){
        updateShopNote(id: $id, data: {name: $name}){
            _id
            name
        }
    }
`;

exports.handler = async event => {
  const { id, name } = JSON.parse(event.body);
  const { data, errors } = await query(
       UPDATE_SHOPNOTE, { id, name });

  if (errors) {
    return {
      statusCode: 500,
      body: JSON.stringify(errors)
    };
  }

  return {
    statusCode: 200,
    body: JSON.stringify({ shopnote: data.updateShopNote })
  };
};