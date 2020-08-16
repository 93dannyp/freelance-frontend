import React, { Component } from 'react'
import NewProject from './modals/NewProject'
import ProjectEditForm from './modals/ProjectEditForm'
import styled from 'styled-components'

const CardArrangement = styled.div`
    display: flex;
    justify-content: center;
    align-items: flex-start;
    flex-direction: row;
    flex-wrap: wrap;
`

const StyledProjectCard = styled.div`
    width: 200px;
    height: 300px;
    margin: 50px;
    padding: 5px;
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    flex-direction: row;
    flex-wrap: wrap;
    background: rgb(235,235,235);
    color: rgb(56,56,56);
    margin: 5px auto;
    border-radius: 10px;
`
const StyledProjectContent = styled.div`
    display: flex;
    padding: 10px 20px;
    color: rgb(56,56,56);
    margin: 5px 0;
    transition: 0.3s
`
const Content = styled.div`
    display: flex;
    flex-wrap: wrap;
`
const Utilities = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: flex-start;
`
const NavList = styled.ul`
    width: 80%;
    display: flex;
    justify-content: space-between;
    align: items: baseline;
    margin: 0 auto;
    padding: 10px 20px;
`
const ListItem = styled.li`
    padding: 5px;
    box-sizing: border-box;
    color: #fff;
    font-size: 25px;
    font-weight: 500;
`


const baseURL = 'http://localhost:3003'

class ProjectList extends Component {
    state = {
        projects: [],
        arrangeByContact: false,
        baseURL: baseURL,
        projectBeingEdited: null,
        idOfProjectToEdit: -1,
        showNewProject: false,
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

    showNewProjectForm = () => {
        this.setState({
            showNewProject: !this.state.show,
        })
    }

    editProject = (project) => {
        console.log(project)
        this.setState({
            projectBeingEdited: project,
            idOfProjectToEdit: project.id
        })
    }

    updateProject = (event, project) => {
        console.log(project)
        console.log('updated project,', project)
        fetch(baseURL + '/api/projects/' + project.id, {
            method: 'PUT',
            body: JSON.stringify(project),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then((data)=>{
            console.log(data.dataValues)
            return data.json()
        }).then(data => {
            this.handleAddContact(data)
            this.setState({
                idOfProjectToEdit: -1,
                projects: data,
            })
        })
        .catch((err) => {
            console.log(err)
        })
    }

    componentDidMount(){

    }

    render () {
        const projectsByContact = this.props.projects.map((project, index)=>{
            return (
                
                <CardArrangement>
                    
                <div value={project.contactId}  key={index}>
                    <div>
                        <StyledProjectCard>
                            <div>
                                <h5>{project.projectTitle}</h5>
                                <small>{project.projectDueDate}</small>
                                <Utilities>
                                    <button onClick={()=>this.editProject(project)}>Edit</button>
                                    <button onClick={()=>this.props.deleteProject(project.id)}>X</button>
                                </Utilities>
                                
                            </div>
                            <div>
                                <p>{project.projectDescription}</p>  
                            </div>    
                        </StyledProjectCard>
                    </div>
                </div>
                </CardArrangement>

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
                <div>{this.state.idOfProjectToEdit !== -1 ? <ProjectEditForm updateProject={this.updateProject} editProject={this.editProject} idOfProjectToEdit={this.state.idOfProjectToEdit} projectBeingEdited={this.state.projectBeingEdited} /> : null }</div>
            </div>
        )
    }
}

export default ProjectList