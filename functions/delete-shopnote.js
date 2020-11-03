// delete-shopnote.js

const query = require("./utils/query");

const DELETE_SHOPNOTE = `
  mutation($id: ID!) {
    deleteShopNote(id: $id){
      _id
      name
    }
  }
`;

exports.handler = async event => {
  const { id } = JSON.parse(event.body);
  const { data, errors } = await query(
        DELETE_SHOPNOTE, { id });

  if (errors) {
    return {
      statusCode: 500,
      body: JSON.stringify(errors)
    };
  }

  return {
    statusCode: 200,
    body: JSON.stringify({ deleteShopNote: data.deleteShopNote })
  };
};