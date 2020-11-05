// delete-item.js

const query = require("./utils/query");

const DELETE_ITEM = `
  mutation($id: ID!) {
    deleteItem(id: $id){
      _id
      name
    }
  }
`;

exports.handler = async event => {
  const { id } = JSON.parse(event.body);
  const { data, errors } = await query(
        DELETE_ITEM, { id });

  if (errors) {
    return {
      statusCode: 500,
      body: JSON.stringify(errors)
    };
  }

  return {
    statusCode: 200,
    body: JSON.stringify({ item: data.deleteItem })
  };
};