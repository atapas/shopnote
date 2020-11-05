//create-shopnote.js

const query = require("./utils/query");

const CREATE_SHOPNOTE = `
  mutation($name: String!, $items: ShopNoteItemsRelation!){
    createShopNote(data: {name: $name, items: $items}){
        _id
        name
        items {
            data {
                name,
                checked,
                urgent,
                quantity
            }
        }
    }
  }
`;

exports.handler = async event => {
  
  const { name, items } = JSON.parse(event.body);
  const { data, errors } = await query(
    CREATE_SHOPNOTE, { name, items });

  if (errors) {
    return {
      statusCode: 500,
      body: JSON.stringify(errors)
    };
  }

  return {
    statusCode: 200,
    body: JSON.stringify({ shopnote: data.createShopNote })
  };
};