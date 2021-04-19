import { gql } from "@apollo/client";

export const SIGN_UP = gql`
  mutation signUp($email: String!) {
    signUp(email: $email) {
      type
      message
      token
    }
  }
`;

export const ALL_WORDS = gql`
  {
    allWords {
      id
      name
      caption
      votes {
        id
      }
      image {
        id
        url
      }
    }
  }
`;

export const SPECIFIC_WORDS = gql`
  query specificWords($alphabet: String!) {
    specificWords(alphabet: $alphabet) {
      id
      name
      caption
      image {
        url
      }
      votes {
        id
      }
    }
  }
`;

export const HAVING_WORDS = gql`
  {
    havingWords {
      name
      count
    }
  }
`;

export const ALL_IMAGES = gql`
  {
    allImages {
      id
      url
    }
  }
`;

export const EDIT_WORD = gql`
  mutation editWord(
    $wordId: String!
    $name: String
    $caption: String
    $url: String
  ) {
    editWord(wordId: $wordId, name: $name, caption: $caption, url: $url)
  }
`;

export const DELETE_WORD = gql`
  mutation deleteWord($wordId: String!) {
    deleteWord(wordId: $wordId)
  }
`;

export const SELF_PROFILE = gql`
  {
    self {
      id
      userName
      email
      avatar
    }
  }
`;

export const CREATE_WORD = gql`
  mutation createWord($name: String!, $caption: String!, $url: String) {
    createWord(name: $name, caption: $caption, url: $url) {
      result
      message
    }
  }
`;
