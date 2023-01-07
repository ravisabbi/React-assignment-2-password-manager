import {Component} from 'react'
import {v4} from 'uuid'
import PasswordItem from '../PasswordItem'
import './index.css'

const initialClassnamesList = [
  'bg1',
  'bg2',
  'bg3',
  'bg4',
  'bg5',
  'bg6',
  'bg7',
  'bg8',
  'bg9',
  'bg10',
  'bg11',
  'bg12',
  'bg13',
]

class PasswordManager extends Component {
  state = {
    passwordsList: [],
    websiteInput: '',
    usernameInput: '',
    passwordInput: '',
    searchInput: '',
    isShow: false,
  }

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  onChangeUsernameInput = event => {
    this.setState({usernameInput: event.target.value})
  }

  onChangePasswordInput = event => {
    this.setState({passwordInput: event.target.value})
  }

  onChangeWebsiteInput = event => {
    this.setState({websiteInput: event.target.value})
  }

  onAddPassword = event => {
    event.preventDefault()
    const {websiteInput, usernameInput, passwordInput} = this.state
    if (websiteInput !== '' && usernameInput !== '' && passwordInput !== '') {
      const randomIndex = Math.ceil(
        Math.random() * initialClassnamesList.length - 1,
      )

      const newPassword = {
        id: v4(),
        website: websiteInput,
        username: usernameInput,
        password: passwordInput,
        passwordLogoClassName: initialClassnamesList[randomIndex],
      }

      this.setState(prevState => ({
        passwordsList: [...prevState.passwordsList, newPassword],
        websiteInput: '',
        usernameInput: '',
        passwordInput: '',
      }))
    }
  }

  ToggleShowingPasswords = event => {
    this.setState({isShow: event.target.checked})
  }

  onDeletePassword = id => {
    const {passwordsList} = this.state
    const updatedList = passwordsList.filter(eachItem => eachItem.id !== id)
    this.setState({passwordsList: updatedList})
  }

  renderPasswords = searchResults => {
    const {isShow} = this.state
    return (
      <ul className="passwordsList">
        {searchResults.map(eachItem => (
          <PasswordItem
            passwordDetails={eachItem}
            key={eachItem.id}
            isShow={isShow}
            onDeletePassword={this.onDeletePassword}
          />
        ))}
      </ul>
    )
  }

  renderingNoPasswords = () => (
    <>
      <img
        src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
        alt="no passwords"
        className="no-passwords-image"
      />
      <p className="no-passwords-heading">No Passwords</p>
    </>
  )

  render() {
    const {
      websiteInput,
      usernameInput,
      passwordInput,
      searchInput,
      passwordsList,
    } = this.state

    const searchResults = passwordsList.filter(eachItem =>
      eachItem.website.toLowerCase().includes(searchInput.toLowerCase()),
    )

    return (
      <div className="app-container">
        <div>
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
            alt="app logo"
            className="app-logo"
          />
        </div>
        <div className="add-passwords-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-sm-img.png"
            alt="password manager"
            className="password-manager-image"
          />
          <form className="form" onSubmit={this.onAddPassword}>
            <h1 className="add-user-heading">Add New Password</h1>
            <div className="field-container">
              <div className="field-image-container">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
                  alt="website"
                  className="field-image"
                />
              </div>

              <input
                type="text"
                placeholder="Enter Website"
                className="form-input-element"
                value={websiteInput}
                onChange={this.onChangeWebsiteInput}
              />
            </div>

            <div className="field-container">
              <div className="field-image-container">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
                  alt="username"
                  className="field-image"
                />
              </div>

              <input
                type="text"
                placeholder="Enter Username"
                className="form-input-element"
                value={usernameInput}
                onChange={this.onChangeUsernameInput}
              />
            </div>

            <div className="field-container">
              <div className="field-image-container">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
                  alt="password"
                  className="field-image"
                />
              </div>

              <input
                type="password"
                placeholder="Enter Password"
                className="form-input-element"
                value={passwordInput}
                onChange={this.onChangePasswordInput}
              />
            </div>
            <button type="submit" className="add-btn">
              Add
            </button>
          </form>
        </div>
        <div className="your-passwords-container">
          <div className="your-passwords-top-section">
            <div className="passwords-count-container">
              <h1 className="your-passwords-heading">Your Passwords</h1>
              <p className="passwords-count">{searchResults.length}</p>
            </div>

            <div className="searchbar-container">
              <div className="searchbar-image-container">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
                  alt="search"
                  className="search-image"
                />
              </div>

              <input
                type="search"
                placeholder="Search"
                className="search-input"
                value={searchInput}
                onChange={this.onChangeSearchInput}
              />
            </div>
          </div>
          <hr className="hr-line" />
          <div className="checkbox-container">
            <input
              type="checkbox"
              id="checkbox"
              className="checkbox"
              onClick={this.ToggleShowingPasswords}
            />
            <label htmlFor="checkbox" className="checkbox-label">
              Show Passwords
            </label>
          </div>
          <div className="your-passwords-body-container">
            {searchResults.length !== 0
              ? this.renderPasswords(searchResults)
              : this.renderingNoPasswords()}
          </div>
        </div>
      </div>
    )
  }
}
export default PasswordManager
