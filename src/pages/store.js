import React from 'react'
import { Link, graphql } from 'gatsby'
import Masonry from 'react-masonry-component'
import Img from 'gatsby-image'
import Layout from "../components/layout"

const StorePage = ({ data }) => (
  <Layout>
    <Masonry className="showcase">
      {data.allDatoCmsStore.edges.map(({ node: store }) => (
        <div key={store.id} className="showcase__item">
          <figure className="card">
            <Link to={`/store/${store.slug}`} className="card__image">
              <Img fluid={store.coverImage.fluid} />
            </Link>
            <figcaption className="card__caption">
              <h6 className="card__title">
                <Link to={`/store/${store.slug}`}>{store.title}</Link>
              </h6>
              <div className="card__description">
                <p>{store.excerpt}</p>
              </div>
            </figcaption>
          </figure>
        </div>
      ))}
    </Masonry>
  </Layout>
)

export default StorePage

export const query = graphql`
  query StoresQuery {
    allDatoCmsStore(sort: { fields: [position], order: ASC }) {
      edges {
        node {
          id
          title
          slug
          excerpt
          coverImage {
            fluid(maxWidth: 450, imgixParams: { fm: "jpg", auto: "compress" }) {
              ...GatsbyDatoCmsSizes
            }
          }
        }
      }
    }
  }
`
