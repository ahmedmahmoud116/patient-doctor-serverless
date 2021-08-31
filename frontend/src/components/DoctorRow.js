import React from 'react';

export default class DoctorRow extends React.Component {
    render() {
        return (
            <tr onClick={event => window.location.href = "Doctor/" + this.props.doctor.id}>
                <td>{this.props.doctor.firstName}</td>
                <td>{this.props.doctor.lastName}</td>
                <td>{this.props.doctor.specialization}</td>
                {/* <td>{this.props.customer.available.toString()}</td> */}
                {/* <td>{this.props.doctor.id}</td> */}
            </tr>
        );
    }
}