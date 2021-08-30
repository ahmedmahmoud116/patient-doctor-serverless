const resolvers = {
    Query: {
        // Returns an list of Patients
        getAllPatients: (_, __, { dataSources }) => {
            return dataSources.patientAPI.getAllPatients();
        },

        // Returns an list of Doctors
        getAllDoctors: (_, __, { dataSources }) => {
            return dataSources.patientAPI.getAllDoctors();
        },

        // Returns a single Patient, provided with a patient's id
        getPatient: (_, { doctor_id, patient_id }, { dataSources }) => {
            return dataSources.patientAPI.getPatient(doctor_id, patient_id);
        },

        // Returns a single Doctor, provided with a doctor's id
        getDoctor: (_, { id }, { dataSources }) => {
            return dataSources.patientAPI.getDoctor(id);
        },
        
    },

    Mutation: {
        // Adds a new patient
        addPatient: (_, {firstName, lastName, syndrome, doctor_id }, { dataSources }) => {
            return dataSources.patientAPI.addPatient(firstName, lastName, syndrome, doctor_id);
        },

        // Adds a new doctor
        addDoctor: (_, {firstName, lastName, specialization }, { dataSources }) => {
            return dataSources.patientAPI.addDoctor(firstName, lastName, specialization);
        },

        // Updates an existing patient
        // updatePatient: (_, { id, firstName, lastName, syndrome }, { dataSources }) => {
        //     return dataSources.patientAPI.updatePatient(id, firstName, lastName, syndrome);
        // },
    },
}

module.exports = resolvers;
