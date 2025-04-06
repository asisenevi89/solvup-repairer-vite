import { ChangeEvent, memo, SyntheticEvent, useState } from "react";
import { useDispatch } from "react-redux";
import { initLogin } from "../../ActionCreators/User";
import { Card, Typography, TextField, Button, Link, Divider } from "../UI";
import mainLogo from '../../Assets/images/logo-green.png';
import './styles.scss';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const dispatch = useDispatch();

  const validateUsername = (value: string) => {
    let message = '';

    if (!value) {
      message = 'Username cannot be empty.';
    }

    setUsernameError(message);
    return !!message
  };

  const validatePassword = (value: string) => {
    let message = '';

    if (!value) {
      message = 'Password cannot be empty.';
    }

    setPasswordError(message);
    return !!message;
  };

  const onChangeUserName = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    validateUsername(value);
    setUsername(value);
  };

  const onChangePassword = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    validatePassword(value);
    setPassword(value);
  };

  const handleSubmit = (event: SyntheticEvent) => {
    event.preventDefault();
    const hasPasswordError = validatePassword(password);
    const hasUsernameError = validateUsername(username);

    if (hasPasswordError || hasUsernameError) return;

    const data = {
      identifier: username,
      password
    };
    dispatch(initLogin(data));
  };

  return (
    <Card wrapperClass="login-form">
      <div className="top-section">
        <img src={mainLogo} alt="logo" width={180} />
        <Typography variant="h3">Authorized User Login</Typography>
      </div>
      <form className="controls-section" onSubmit={handleSubmit}>
        <TextField
          type="text"
          label="Store Code / Email"
          value={username}
          hasError={!!usernameError}
          helperText={usernameError}
          onChange={onChangeUserName}
        />
        <TextField
          type="password"
          label="Password"
          value={password}
          hasError={!!passwordError}
          helperText={passwordError}
          onChange={onChangePassword}
        />
        <Button
          fullWidth
          variant="contained"
          onClick={handleSubmit}
          type="submit"
        >
          Login
        </Button>
        <Divider className="btn-divider">OR</Divider>
        <Button
          fullWidth
          variant="outlined"
        >
          Single Sign-on
        </Button>
      </form>
      <div className="bottom-section">
        <Typography variant="h5" marginRight="10px">
            Trouble Logging in?
          </Typography>
        <Link href="#">Click Here </Link>
      </div>
    </Card>
  );
};

export default memo(LoginForm);

