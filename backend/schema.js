const { gql } = require('apollo-server');

const typeDefs = gql`
  type Query {
    "Query to list patients"
    getAllPatients: [Patient]!
    "Fetch a specific Patient, provided a Patient's id"
    getPatient(id: ID!): Patient
  }

  type Mutation {
      addPatient(firstName: String!, lastName: String!, syndrome: String): AddPatientResponse,
  }

  "A patient is a person"
  type Patient {
    "The patient's ID"
    id: ID!
    "The patient's first name"
    firstName: String!
    "The patient's last name"
    lastName: String!
    syndrome: String
    doctor: Doctor
  }

  "Response to addPatient mutation"
  type AddPatientResponse {
      code: Int!
      success: Boolean!
      message: String!
      patient: Patient
  }

  "Response to updatePatient mutation"
  type UpdatePatientResponse {
      code: Int!
      success: Boolean!
      message: String!
      patient: Patient
  }
`;

module.exports = typeDefs;