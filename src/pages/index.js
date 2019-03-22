import React from "react"
import { graphql, Link } from 'gatsby'
import Header from '../components/Header'
import YouTube from 'react-youtube'

const Layout =  ({data}) => {
  const { edges } = data.allMarkdownRemark

  const opts = {
    height: '390',
    width: '640',
    playerVars: { // https://developers.google.com/youtube/player_parameters
      autoplay: 1
    }
  };

  const _onReady = (event) => {
    // access to player in all event handlers via event.target
    event.target.pauseVideo();
  }


  return (
    <div>
      <Header />
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        fontFamily: 'avenir'
      }}>
        {edges.map(edge => {
          const {frontmatter} = edge.node
          return (
            <div key={frontmatter.path} style={{marginBottom: '1rem'}} >
              <Link to={frontmatter.path}>
                {frontmatter.title}
              </Link>
            </div>
          )
        })}
        <div>
          <Link to='/tags'>Browse by Tags</Link>
        </div>
        <YouTube
          videoId="7fVK7atPvLQ"
          opts={opts}
          onReady={_onReady}
        />
      </div>
    </div>

    
  )
}

export const query = graphql`
  query HomepageQuery {
    allMarkdownRemark (
      sort: {order: DESC, fields: [frontmatter___date]}
    ) {
      edges {
        node {
          frontmatter {
            title
            path 
            date
          }
        }
      }
    }
  }
`

export default Layout