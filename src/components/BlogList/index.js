// Write your JS code here
import {Component} from 'react'
import Loader from 'react-loader-spinner'
import BlogItem from '../BlogItem'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import './index.css'

class BlogList extends Component {
  state = {
    isLoading: true,
    blogData: [],
  }

  componentDidMount() {
    this.getBlogData()
  }

  getBlogData = async () => {
    const responseData = await fetch('https://apis.ccbp.in/blogs')
    const blogData = await responseData.json()
    const formattedBlogData = blogData.map(eachBlogData => ({
      id: eachBlogData.id,
      title: eachBlogData.title,
      author: eachBlogData.author,
      topic: eachBlogData.topic,
      imageUrl: eachBlogData.image_url,
      avatarUrl: eachBlogData.avatar_url,
    }))
    this.setState({blogData: formattedBlogData, isLoading: false})
  }

  render() {
    const {isLoading, blogData} = this.state
    return (
      <div className="blog-list-container">
        {isLoading ? (
          <div data-testid="loader">
            <Loader type="TailSpin" color="#00bfff" height={50} width={50} />
          </div>
        ) : (
          <ul className="blog-list">
            {blogData.map(eachBlogData => (
              <BlogItem key={eachBlogData.id} blogItemDetails={eachBlogData} />
            ))}
          </ul>
        )}
      </div>
    )
  }
}

export default BlogList
