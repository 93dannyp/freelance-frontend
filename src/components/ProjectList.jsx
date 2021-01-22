import React, { Component } from 'react'
import NewProject from './modals/NewProject'
import styled from 'styled-components'

const StyledContactList = styled.ul`
    width: 90%;
    margin: 50px;
    padding: 5px;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    background: rgba(240,240,240, .8);
    color: rgb(56,56,56);
    margin: 5px auto;
    border-radius: 10px;
`
const StyledContactListItems = styled.li`
    width: 90%;
    display: flex;
    flex-direction: column;
    padding: 10px 20px;
    color: rgb(56,56,56);
    margin: 0;
    padding: 0;
    transition: 0.3s
`
const StyledTitle = styled.h5`
    margin: 0;
    padding: 0;
`
const Content = styled.div`
    display: flex;
    flex-wrap: wrap;
`
const Utilities = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: flex-start;
    margin: 0;
    padding: 0;
`
const NavDiv = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;
    margin: 0;
    padding: 0;
`
const NavList = styled.ul`
    width: 80%;
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    margin-left: 40px;
    padding: 0;
`
const ListItem = styled.li`
    padding: 5px;
    margin-left: 15px;
    padding-left 20px;
    color: #fff;
    font-size: 25px;
    font-weight: 500;
`
const AddButton = styled.div`
    padding: 4px 10px 8px 10px;
    border-radius: 5px;
    background-color: rgba(0,0,0,0.2);
    color: #fff;   
    font-sixe: small;
`
// for development
// const baseURL = 'http://localhost:3003' 

// for production
const baseURL = 'https://freelance-backend.herokuapp.com'

class ProjectList extends Component {
    state = {
        projects: [],
        arrangeByContact: false,
        baseURL: baseURL,
        projectBeingEdited: null,
        idOfProjectToEdit: -1,
        showNewProject: false,
    }

    handleAddProject = (project) => {
        const copyProjects = [...this.state.projects]
        copyProjects.unshift(project)
        this.setState({
            projects: copyProjects,
        })
    }

    showNewProjectForm = () => {
        this.setState({
            showNewProject: !this.state.show,
        })
    }

    render () {
        const projectsByContact = this.props.projects.map((project, index) => {
            return (
            <div 
                value={project.contactId} 
                key={index}>
                    <StyledContactList>
                        <StyledContactListItems>
                            <NavDiv>
                                <div>
                                    <StyledTitle>{project.projectTitle}</StyledTitle>
                                    <small>Due: {project.projectDueDate}</small>
                                </div>
                                <Utilities>
                                    <button 
                                        onClick={()=>this.props.deleteProject(project.id)}>
                                        X
                                    </button>
                                </Utilities>
                            </NavDiv>
                            <Content>
                                <p>{project.projectDescription}</p>  
                            </Content>    
                        </StyledContactListItems>
                    </StyledContactList>
                </div>
            )
        })

        return (
            <div id='section3'>
                <div>
                    <NavList>
                        <ListItem>Projects</ListItem>
                        <ListItem 
                            onClick={()=>{this.showNewProjectForm()}}>
                            <AddButton>
                                + 
                            </AddButton>
                        </ListItem>    
                    </NavList>
                    { this.state.showNewProject ? 
                    <NewProject 
                    contacts={this.props.contacts} 
                    handleAddProject={this.handleAddProject}/> 
                    : <div>{projectsByContact}</div> }                
                </div>
            </div>
        )
    }
}

export default ProjectList