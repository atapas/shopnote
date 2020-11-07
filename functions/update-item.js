// update-item.js

const query = require("./utils/query");

const UPDATE_ITEM = `
    mutation($id: ID!, $name: String!, $checked: Boolean!, $urgent: Boolean!){
        updateItem(id: $id, data: {name: $name, checked: $checked, urgent: $urgent}){
            _id
            name
            checked
            urgent
        }
    }
`;

exports.handler = async event => {
  const { id, name, checked, urgent } = JSON.parse(event.body);
  const { data, errors } = await query(
       UPDATE_ITEM, { id, name, checked, urgent });

  if (errors) {
    return {
      statusCode: 500,
      body: JSON.stringify(errors)
    };
  }

  return {
    statusCode: 200,
    body: JSON.stringify({ item: data.updateItem })
  };
};