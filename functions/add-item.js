//add-item.js

const query = require("./utils/query");

const ADD_ITEM = `
  mutation($name: String!, $urgent: Boolean!, $checked: Boolean!, $note: ItemNoteRelation!){
    createItem(data: {name: $name, urgent: $urgent, checked: $checked, note: $note}){
        _id
        name
        urgent
        checked
        note {
            name
        }
    }
  }
`;

exports.handler = async event => {
  
  const { name, urgent, checked, note} = JSON.parse(event.body);
  const { data, errors } = await query(
    ADD_ITEM, { name, urgent, checked, note });

  if (errors) {
    return {
      statusCode: 500,
      body: JSON.stringify(errors)
    };
  }

  return {
    statusCode: 200,
    body: JSON.stringify({ item: data.createItem })
  };
};