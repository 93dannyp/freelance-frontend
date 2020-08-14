import React, { Component } from 'react'
import NewProject from './modals/NewProject'
import styled from 'styled-components'




const baseURL = 'http://localhost:3003'

class ProjectList extends Component {
    state = {
        projects: [],
        arrangeByContact: false,
        baseURL: baseURL,
        contactBeingEdited: null,
        idOfContactToEdit: -1
    }
    arrangeProjectByContact = () => {
        this.setState({
            arrangeByContact: !this.state.arrangeByContact,
        })
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

        const projectsByContact = this.props.projects.map((project, index)=>{
            return (
                <div value={project.contactId}  key={index}>
                    <div>
                        <div>
                            <div>
                                <div>
                                    <div sm={4}>
                                        <h5>{project.projectTitle}</h5>
                                    </div>
                                    <div md={{ span: 4, offset: 4 }}>
                                        <small>{project.projectDueDate}</small>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <p>{project.projectDescription}</p>  
                            </div>
                            
                                 
                            
                            
                        </div>
                    </div>
                </div>
            )
        })

        return (
            <div>
                <h2>Projects</h2>
                <button onClick={ () => {
                this.arrangeProjectByContact()
                 }}>Sort</button>
                {this.state.arrangeByContact ? projectsByContact : null }
                
                <NewProject contacts={this.props.contacts} baseURL={this.state.baseURL} handleAddProject={this.handleAddProject}/>
                
            

            </div>
        )
    }

}

export default ProjectList