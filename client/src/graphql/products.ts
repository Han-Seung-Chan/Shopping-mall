import { gql } from 'graphql-tag';

export const GET_PRODUCTS = gql`
  query GET_PRODUCTS {
    products {
      id
      imageUrl
      price
      title
      description
      createdAt
    }
  }
`;

export const GET_PRODUCT = gql`
  query GET_PRODUCT($id: ID!) {
    product(id: $id) {
      id
      imageUrl
      price
      title
      description
      createdAt
    }
  }
`;
