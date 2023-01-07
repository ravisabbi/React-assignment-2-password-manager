import './index.css'

const PasswordItem = props => {
  const {passwordDetails, isShow, onDeletePassword} = props
  const {
    website,
    username,
    password,
    passwordLogoClassName,
    id,
  } = passwordDetails

  const onDelete = () => {
    onDeletePassword(id)
  }

  return (
    <li className="password-list-item">
      <div className={`logo-container ${passwordLogoClassName}`}>
        <p className="logo-letter">{website.slice(0, 1)}</p>
      </div>
      <div className="passwords-details-container">
        <p className="website">{website}</p>
        <p className="username">{username}</p>
        {isShow ? (
          <p className="password">{password}</p>
        ) : (
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png"
            alt="stars"
            className="stars"
          />
        )}
      </div>
      <button type="button" className="delete-btn" onClick={onDelete}>
        <img
          src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
          alt="delete"
          className="delete-icon"
        />
      </button>
    </li>
  )
}

export default PasswordItem
