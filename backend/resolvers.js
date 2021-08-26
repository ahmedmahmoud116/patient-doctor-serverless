const resolvers = {
    Query: {
        // Returns an list of Patients
        getAllPatients: (_, __, { dataSources }) => {
            return dataSources.patientAPI.getAllPatients();
        },

        // Returns a single Patient, provided with a patient's id
        getPatient: (_, { id }, { dataSources }) => {
            return dataSources.patientAPI.getPatient(id);
        },
    },

    Mutation: {
        // Adds a new patient
        addPatient: (_, {firstName, lastName, syndrome }, { dataSources }) => {
            return dataSources.patientAPI.addPatient(firstName, lastName, syndrome);
        },

        // Updates an existing patient
        // updatePatient: (_, { id, firstName, lastName, syndrome }, { dataSources }) => {
        //     return dataSources.patientAPI.updatePatient(id, firstName, lastName, syndrome);
        // },
    },
}

module.exports = resolvers;
