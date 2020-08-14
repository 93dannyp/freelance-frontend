import React, { Component } from 'react'
import styled from 'styled-components'

const SidebarContainer = styled.div`
    height: 100vh;
    background-color: rgb(70, 70, 70);
    color: #fff
    display: flex;
    flex-direction: column;
    align-items: left;
    @media (max-width: 375px) {
        display: none;
     }
`
const SidebarMenu = styled.ul`
    display: flex;
    align-items: left;
    flex-direction: column;
    list-style: none;
    width: 100%
`
const SidebarMenuItem = styled.li`
    display: flex;
    height: 40px;
    width: 100%;
    align-items: center;
    padding-top: 20px;
    padding-left: 30 px;
    &:hover {
        background: rgba(255, 255, 255, 0.05);
        box-shadow: inset 3px 0 0 0 #ffffff;
    }
`
const SidebarMenuItemLabel = styled.p`

        margin-top: 0;
        font-family: 'Open Sans', sans-serif;
        color: rgb(183, 183, 183);
        font-size: 14px;
        line-height: 1.5;
        font-weight: 500;
        text-align: left;
        padding: 12px 0px;
        margin-left: 20px;
        color: #ffffff;
`
const UserAuthItem = styled.div`
    padding-left: 30 px;
    margin: 200px 30px 60px 30px;
`
const UserAuthLabel = styled.div`

        font-family: 'Open Sans', sans-serif;
        font-size: 14px;
        line-height: 1.5;
        font-weight: 500;
        height: 45px;
        width: 100%;
        color: rgba(255, 255, 255, 0.7);
        
        padding: 20px 0px 0px 0px;
        &:hover {
           
            color: #fff;
        }
        
`;

class SideBar extends Component {
    render () {
        return <>
            <SidebarContainer>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuItemLabel>Dashboard</SidebarMenuItemLabel>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                        <SidebarMenuItemLabel>Contacts</SidebarMenuItemLabel>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                        <SidebarMenuItemLabel>Projects</SidebarMenuItemLabel>
                    </SidebarMenuItem>
                    <UserAuthItem>
                        <UserAuthLabel>Login</UserAuthLabel>
                        <UserAuthLabel>Sign Out</UserAuthLabel>
                    </UserAuthItem>
                </SidebarMenu>
            </SidebarContainer>
        </>
    }
}

export default SideBar