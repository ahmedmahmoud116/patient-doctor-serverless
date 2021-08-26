const { v4: uuidv4 } = require('uuid');
const { DataSource } = require("apollo-datasource");
const AWS = require('aws-sdk');
AWS.config.update({ region: 'us-east-1' });


class PatientAPI extends DataSource {
    constructor() {
        super();
    }

    // Get list of all patients from DynamoDB table
    async getAllPatients() {
        const params = {
            TableName: 'patientTable',
        };

        const docClient = new AWS.DynamoDB.DocumentClient();
        let results = [];
        let items;

        do {
            items = await docClient.scan(params).promise();
            items.Items.forEach((item) => results.push(item));
            params.ExclusiveStartKey = items.LastEvaluatedKey;
        } while (typeof items.LastEvaluatedKey !== 'undefined');

        return results;
    }

    // Get a specific patient from the DynamoDB table, provided a patient's id
    async getPatient(id) {
        const params = {
            TableName: 'patientTable',
            Key: {
                id: id,
            }
        };

        const docClient = new AWS.DynamoDB.DocumentClient();
        const getResult = await docClient.get(params).promise();

        if (getResult.Item) {
            return getResult.Item;
        } else {
            return new Error("Patient not found");
        }
    }

    // Add a new Patient to the DynamoDB
    async addPatient(firstName, lastName, syndrome) {
        const patient = {
            id: uuidv4(),
            firstName: firstName,
            lastName: lastName,
            syndrome: syndrome
        }
        const patientParams = {
            TableName: "patientTable",
            Item: patient,
        };

        try {
            const dynamodb = new AWS.DynamoDB.DocumentClient();
            const putResult = await dynamodb.put(patientParams).promise();

            return {
                code: 201,
                success: true,
                message: "Patient successfully added",
                patient: patient,
            }
        } catch (putError) {
            console.log("There was an error adding this patient")
            console.log("putError", putError)
            console.log("patientParams", patientParams)
            return {
                code: 500,
                success: false,
                message: putError,
                patient: null,
            }
        }
    }

    // async updatePatient(id, firstName, lastName, syndrome) {
    //     const docClient = new AWS.DynamoDB.DocumentClient();
    //     const patient = {
    //         id: id,
    //         firstName: firstName,
    //         lastName: lastName,
    //         syndrome: syndrome
    //     }

    //     const params = {
    //         TableName: 'patientTable',
    //         Key: {
    //             email: email,
    //         },
    //         UpdateExpression: 'set firstName = :firstNameVal, lastName = :lastNameVal',
    //         ExpressionAttributeValues: {
    //             ':firstNameVal': firstName,
    //             ':lastNameVal': lastName,
    //         },
    //         ReturnValues: 'UPDATED_NEW',resolver
    //     };

    //     const result = await docClient.update(params).promise();
    //     return {
    //         code: 200,
    //         success: true,
    //         message: 'Patient information updated!',
    //         patient: result.Attributes,
    //     }
    // }
}

module.exports = PatientAPI;