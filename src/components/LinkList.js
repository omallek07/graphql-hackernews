import React, { Component } from 'react'
import Link from './Link'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

class LinkList extends Component {
  render() {
    //is true as long as request is still ongoing and the response has not been recieved
    if (this.props.feedQuery && this.props.feedQuery.loading) {
      return <div>Loading</div>
    }
    //in case the request fails, this will contain information about what went wrong
    if (this.props.feedQuery && this.props.feedQuery.error) {
      return <div>Error</div>
    }
    //actual data that was received from server. Has the links property which represents a list of Link elements
    const linksToRender = this.props.feedQuery.feed.links

    return (
      <div>{linksToRender.map((link, index) => (<Link key={link.id} index={index} link={link} />))}</div>
    )
  }
}

const FEED_QUERY = gql`
  # 2
  query FeedQuery {
    feed {
      links {
        id
        createdAt
        url
        description
        postedBy {
          id
          name
        }
        votes {
          id
          user {
            id
          }
        }
      }
    }
  }
`

export default graphql(FEED_QUERY, { name: 'feedQuery' }) (LinkList)

