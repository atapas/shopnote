// update-item.js

const query = require("./utils/query");

const UPDATE_ITEM = `
    mutation($id: ID!, $name: String!, $checked: Boolean!, $urgent: Boolean!, $quantity: String!){
        updateItem(id: $id, data: {name: $name, checked: $checked, urgent: $urgent, quantity: $quantity}){
            _id
            name
            checked
            urgent
            quantity
        }
    }
`;

exports.handler = async event => {
  const { id, name, checked, urgent, quantity } = JSON.parse(event.body);
  const { data, errors } = await query(
       UPDATE_ITEM, { id, name, checked, urgent, quantity });

  if (errors) {
    return {
      statusCode: 500,
      body: JSON.stringify(errors)
    };
  }

  return {
    statusCode: 200,
    body: JSON.stringify({ updateItem: data.updateItem })
  };
};