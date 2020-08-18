import React, { Component } from 'react'
import styled from 'styled-components'
import { TwitterTimelineEmbed } from 'react-twitter-embed';

class TweetList extends Component {
    render () {
        return (
            <TwitterTimelineEmbed
            sourceType="profile"
            screenName="93dannyp"
            options={{height: 400}}
          />
        )
    }
}

export default TweetList