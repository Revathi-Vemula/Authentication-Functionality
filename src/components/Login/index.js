import Cookies from 'js-cookie'
import {withRouter, Redirect} from 'react-router-dom'

const Login = props => {
  const jwtToken = Cookies.get('jwt_token')

  const setCookiesAndLogin = jwToken => {
    const {history} = props
    Cookies.set('jwt_token', jwToken, {expires: 30})
    history.replace('/')
  }

  if (jwtToken !== undefined) {
    return <Redirect to="/" />
  }

  const onClickLogin = async () => {
    const userDetails = {username: 'rahul', password: 'rahul@2021'}
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const url = 'https://apis.ccbp.in/login'
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      setCookiesAndLogin(data.jwt_token)
    }
  }

  return (
    <div>
      <h1>Please Login</h1>
      <button type="submit" onClick={onClickLogin}>
        Login with Sample Creds
      </button>
    </div>
  )
}

export default withRouter(Login)
