import { gql } from '@apollo/client';

export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      email
      password
      savedBooks {
        _id
        authors
        description
        images
        link
        title
      }
    }
  }
`;

export const QUERY_BOOKS = gql`
  query getBooks {
    books {
      _id
        authors
        description
        images
        link
        title
    }
  }
`;

export const QUERY_ME = gql`
  query me {
    me {
      _id
      username
      email
      password
      savedBooks {
        _id
        authors
        description
        images
        link
        title
      }
    }
  }
`;