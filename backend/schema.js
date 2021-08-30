const { gql } = require('apollo-server');

const typeDefs = gql`
  type Query {
    "Query to list patients"
    getAllPatients: [Patient]!
    "Query to list Doctors"
    getAllDoctors: [Doctor]!
    "Fetch a specific Patient, provided a Patient's id"
    getPatient(doctor_id: ID!, patient_id: ID!): Patient
    "Fetch a specific Doctor, provided a Doctor's id"
    getDoctor(id: ID!): Doctor
  }

  type Mutation {
      addPatient(firstName: String!, lastName: String!, syndrome: String, doctor_id: String!): AddPatientResponse,
      addDoctor(firstName: String!, lastName: String!, specialization: String): AddDoctorResponse
  }

  "A patient is a person"
  type Patient {
    "The patient's ID"
    pk: ID!
    sk: ID!
    "The patient's first name"
    firstName: String!
    "The patient's last name"
    lastName: String!
    syndrome: String
    id: ID!
    doctor_id: ID!
    doctor: Doctor
  }

  "A doctor is a person"
  type Doctor {
    "The doctor's ID"
    pk: ID!
    sk: ID!
    "The patient's first name"
    firstName: String!
    "The patient's last name"
    lastName: String!
    specialization: String
    id: ID!
    patients: [Patient]
  }

  "Response to addPatient mutation"
  type AddPatientResponse {
      code: Int!
      success: Boolean!
      message: String!
      patient: Patient
  }

  "Response to addDoctor mutation"
  type AddDoctorResponse {
      code: Int!
      success: Boolean!
      message: String!
      doctor: Doctor
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