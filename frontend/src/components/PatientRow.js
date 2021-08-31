import React from 'react';

export default class PatientRow extends React.Component {
    render() {
        console.log("props: " + this.props.patient);
        return (
            <tr>
                <td>{this.props.patient.firstName}</td>
                <td>{this.props.patient.lastName}</td>
                <td>{this.props.patient.syndrome}</td>
                {/* <td>{this.props.patient.id}</td> */}
                {/* <td>{this.props.patient.doctor_id}</td> */}
            </tr>
        );
    }
}