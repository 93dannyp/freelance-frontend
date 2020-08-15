import React from 'react'

class ProjectEditForm extends React.Component {
    state = {
        id: this.props.projectBeingEdited.id,
        firstName: this.props.projectBeingEdited.firstName,
        lastName: this.props.projectBeingEdited.lastName,
        phoneNumber: this.props.projectBeingEdited.phoneNumber,
        email: this.props.projectBeingEdited.email,
        img: this.props.projectBeingEdited.img,
    }

    handleChange = (event) => {
        event.preventDefault()
        this.setState({
            [event.currentTarget.id]: event.currentTarget.value
        })
    }

    // componentDidMount() {
    //     this.setState({
    //         firstName: this.props.contactBeingEdited.firstName,
    //         lastName: this.props.contactBeingEdited.lastName,
    //         phoneNumber: this.props.contactBeingEdited.phoneNumber,
    //         email: this.props.contactBeingEdited.email,
    //         img: this.props.contactBeingEdited.img,
    //     })
        
    // }

    render () {
        return (
            <div>
               <h2>Edit Project</h2> 
                <form onSubmit={(event) => {this.props.updateProject(event, this.state)}}>

                    <label htmlFor='projectTitle'></label>
                    <input type='text' id='projectTitle' name='projectTitle' onChange={this.handleChange} value={this.props.projectBeingEdited.projectTitle} />

                    <label htmlFor='projectDescription'></label>
                    <input type='textarea' rows='3' id='projectDescription' name='projectDescription' onChange={this.handleChange} value={this.props.projectBeingEdited.projectDescription} />

                    <label htmlFor='projectDueDate'></label>
                    <input type='text' id='projectDueDate' name='projectDueDate' onChange={this.handleChange} value={this.props.projectBeingEdited.projectDueDate} />

                    <button type='submit' value='Done'>Done</button>
                </form>
            </div>
        )
    }
}

export default ProjectEditForm