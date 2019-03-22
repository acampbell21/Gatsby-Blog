import React from "react"
import { graphql, Link } from 'gatsby'
import Header from '../components/Header'
import YouTube from 'react-youtube'

const Layout =  ({data}) => {
  const { edges } = data.allMarkdownRemark

  const opts = {
    height: '100',
    width: '100',
    playerVars: { // https://developers.google.com/youtube/player_parameters
      autoplay: 1
    }
  };


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
          videoId="L2J2t-6ek0Y"
          opts={opts}
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