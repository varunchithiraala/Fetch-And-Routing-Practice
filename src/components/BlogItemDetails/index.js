// Write your JS code here
import {Component} from 'react'
import Loader from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import './index.css'

class BlogItemDetails extends Component {
  state = {
    isLoading: true,
    blogData: {},
  }

  componentDidMount() {
    this.getBlogItemData()
  }

  getBlogItemData = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    const response = await fetch(`https://apis.ccbp.in/blogs/${id}`)
    const data = await response.json()
    const updatedData = {
      title: data.title,
      author: data.author,
      content: data.content,
      imageUrl: data.image_url,
      avatarUrl: data.avatar_url,
    }
    this.setState({blogData: updatedData, isLoading: false})
  }

  render() {
    const {isLoading, blogData} = this.state
    const {title, author, content, imageUrl, avatarUrl} = blogData

    return (
      <div className="blog-item-details-container">
        {isLoading ? (
          <div data-testid="loader">
            <Loader type="TailSpin" color="#00bfff" height={50} width={50} />
          </div>
        ) : (
          <div className="blog-item-info">
            <h2 className="blog-details-title">{title}</h2>
            <div className="author-details">
              <img src={avatarUrl} className="author-image" alt={author} />
              <p className="author-name">{author}</p>
            </div>
            <img
              src={imageUrl}
              className="blog-item-details-image"
              alt={title}
            />
            <p className="blog-item-details-content">{content}</p>
          </div>
        )}
      </div>
    )
  }
}

export default BlogItemDetails
