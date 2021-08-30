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
            TableName: 'doctorTable',
        };

        const docClient = new AWS.DynamoDB.DocumentClient();
        let results = [];
        let items;

        do {
            items = await docClient.scan(params).promise();
            items.Items.forEach((item) => {if(!item.specialization) results.push(item);});
            params.ExclusiveStartKey = items.LastEvaluatedKey;
        } while (typeof items.LastEvaluatedKey !== 'undefined');

        return results;
    }

    // Get a specific patient from the DynamoDB table, provided a patient's id
    async getPatient(doctor_id, patient_id) {
        // const params = {
        //     TableName: 'doctorTable',
        //     Key: {
        //         "pk": "DOC#" + doctor_id,
        //         "sk": "PAT#" + patient_id
        //     },
        // };

        const params = {
            RequestItems: {
                'doctorTable': {
                    Keys: [
                        {
                            "pk": "DOC#" + doctor_id,
                            "sk": "PAT#" + patient_id
                        },
                        {
                            "pk": "DOC#" + doctor_id,
                            "sk": "DOC#" + doctor_id
                        }
                    ]
                }
            }
        };

        const docClient = new AWS.DynamoDB.DocumentClient();
        const getResult = await docClient.batchGet(params).promise();
        // console.log("Get Result: " + JSON.stringify(getResult.Responses.doctorTable));
        if (getResult.Responses.doctorTable) {
            const patient = getResult.Responses.doctorTable[0];
            const doctor = getResult.Responses.doctorTable[1];
            patient.doctor = doctor;
            return patient;
        } else {
            return new Error("Patient not found");
        }
    }

    // Add a new Patient to the DynamoDB
    async addPatient(firstName, lastName, syndrome, doctor_id) {
        const id = uuidv4();
        const patient = {
            pk: "DOC#" + doctor_id,
            sk: "PAT#" + id,
            firstName: firstName,
            lastName: lastName,
            syndrome: syndrome,
            id: id,
            doctor_id: doctor_id
        }
        const patientParams = {
            TableName: "doctorTable",
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

    // Add a new Doctor to the DynamoDB
    async addDoctor(firstName, lastName, specialization) {
        const id = uuidv4();
        const doctor = {
            pk: "DOC#" + id,
            sk: "DOC#" + id,
            firstName: firstName,
            lastName: lastName,
            specialization: specialization,
            id: id
        }
        const doctorParams = {
            TableName: "doctorTable",
            Item: doctor,
        };

        try {
            const dynamodb = new AWS.DynamoDB.DocumentClient();
            const putResult = await dynamodb.put(doctorParams).promise();

            return {
                code: 201,
                success: true,
                message: "Doctor successfully added",
                patient: doctor,
            }
        } catch (putError) {
            console.log("There was an error adding this doctor")
            console.log("putError", putError)
            console.log("doctorParams", doctorParams)
            return {
                code: 500,
                success: false,
                message: putError,
                patient: null,
            }
        }
    }

    // Get list of all doctors from DynamoDB table
    async getAllDoctors() {
        const params = {
            TableName: 'doctorTable'
        };

        const docClient = new AWS.DynamoDB.DocumentClient();
        let results = [];
        let items;

        do {
            items = await docClient.scan(params).promise();
            items.Items.forEach((item) => {if(item.specialization) results.push(item);});
            params.ExclusiveStartKey = items.LastEvaluatedKey;
        } while (typeof items.LastEvaluatedKey !== 'undefined');

        return results;
    }

    // Get a specific doctor from the DynamoDB table, provided a doctor's id
    async getDoctor(id) {
        // const params = {
        //     TableName: 'doctorTable',
        //     Key: {
        //         pk: "DOC#" + id,
        //     }
        // };
        const id_concat = "DOC#" + id;
        // console.log("AAAAA: " + id_concat);
        const params = {
            TableName: "doctorTable",
            KeyConditionExpression: '#doctorpk = :id_concat',
            ExpressionAttributeNames:{
              "#doctorpk" : "pk",
            },
            ExpressionAttributeValues:{
              ":id_concat": id_concat
            }
          }

        const docClient = new AWS.DynamoDB.DocumentClient();
        const getResult = await docClient.query(params).promise();
        
        // console.log("Get Result: " + JSON.stringify(getResult));
        if (getResult.Items) {
            const doctor = getResult.Items[0];
            const patientarr = getResult.Items.slice(1,getResult.Items.length)
            doctor.patients = patientarr;
            // console.log("Get Result after modifcation:" + JSON.stringify(doctor))
            return doctor;
        } else {
            return new Error("Doctor not found");
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
    //         TableName: 'doctorTable',
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