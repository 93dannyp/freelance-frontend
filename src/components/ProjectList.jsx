import React, { Component } from 'react'
import NewProject from './modals/NewProject'

const baseURL = 'http://localhost:3003'

class ProjectList extends Component {
    state = {
        projects: [],
        show: false,
        baseURL: baseURL,
        contactBeingEdited: null,
        idOfContactToEdit: -1
    }

    handleAddProject = (project) => {
        const copyProjects = [...this.state.projects]
        copyProjects.unshift(project)
        
        this.setState({
            projects: copyProjects,
            // show: false
        })
    }

    render () {
        return (
            <div>
                <h2>Projects</h2>
                <NewProject baseURL={this.state.baseURL} handleAddProject={this.handleAddProject}/>
            </div>
        )
    }

}

export default ProjectList