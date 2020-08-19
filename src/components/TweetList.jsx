import React, { Component } from 'react'
import styled from 'styled-components'
import { TwitterTimelineEmbed } from 'react-twitter-embed';

const StyledTweetContainer = styled.div`
   
`
const NavList = styled.ul`
    width: 80%;
    display: flex;
    justify-content: space-between;
    align-items: baseline;
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

class TweetList extends Component {
    render () {
        return (
            <div id='section5'>
            <NavList>
                <ListItem>Social</ListItem>
            </NavList>
            <StyledTweetContainer>
            <TwitterTimelineEmbed
            sourceType="profile"
            screenName="93dannyp"
            options={{height: 400}}
          />
          </StyledTweetContainer>
          </div>
        )
    }
}

export default TweetList