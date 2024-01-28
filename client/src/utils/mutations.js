import { gql } from '@apollo/client';


export const LOGIN_USER = gql`
    mutation login($email: String!, $password: String!) {
        login(emial: $email, password: $password)
        {
            user {
                username
                _id
            }
        }
    }`;


export const ADD_USER = gql`
 mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
            username
            _id
          }
    }
    `;


export const SAVE_BOOK = gql`
mutation saveBook($input: BookInput!) {
    saveBook(input: $input){
        username
        _id
        email
        bookCount
        savedBooks
    }
}`
    
export const REMOVE_BOOK = gql`
mutation removeBook($bookId: ID!) {
    removeBook(bookId: $bookId) {
        username
        id
        email
        bookcount
        savedBooks
    }
}`
