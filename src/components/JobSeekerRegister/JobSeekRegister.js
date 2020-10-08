import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

/* UI */
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Box from '@material-ui/core/Box';
// import FacebookSvgIcon from '../FacebookSvgIcon/FacebookSvgIcon';
// import GoogleSvgIcon from '../GoogleSvgIcon/GoogleSvgIcon';

/* firebase */
import { useAuth } from '../../services/authentication';
import { ROLES } from '../../constants/constants';

function EmployerRegister() {
  const { signup } = useAuth();
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [error, setError] = useState(null);
  const handleEmailInput = ({ target: { value } }) => setEmail(value);
  const handlePasswordInput = ({ target: { value } }) => setPassword(value);
  const handlePassword2Input = ({ target: { value } }) => setPassword2(value);

  const handleRegister = () => {
    signup(email, password, ROLES.user)
      .then((user) => {
        history.push('/email-verification');
      })
      .catch((error) => {
        console.log(error);
        setError(error.message);
      });
  };

  const isInvalid = password !== password2 || password === '' || email === '';
  const handleFormCancel = () => history.push('/');
  return (
    <Box style={{ display: 'flex', width: '100%', justifyContent: 'center' }}>
      <form
        style={{ display: 'flex', flexDirection: 'column', marginRight: 20 }}
        autoComplete="off"
      >
        <TextField
          color="primary"
          required
          label="email"
          variant="outlined"
          helperText=""
          error={false}
          onChange={handleEmailInput}
          value={email}
          type="email"
          style={{
            margin: '0 0 10px',
          }}
        />

        <TextField
          color="primary"
          required
          label="password"
          variant="outlined"
          helperText=""
          error={false}
          onChange={handlePasswordInput}
          value={password}
          type="password"
          style={{
            margin: '0 0 10px',
          }}
        />

        <TextField
          color="primary"
          required
          label="confirm password"
          variant="outlined"
          helperText=""
          error={false}
          onChange={handlePassword2Input}
          value={password2}
          type="password"
          style={{
            margin: '0 0 10px',
          }}
        />

        <ButtonGroup
          style={{
            display: 'flex',
            justifyContent: 'center',
          }}
          aria-label="outlined primary button group"
        >
          <Button
            style={{
              flexGrow: 1,
            }}
            disabled={isInvalid}
            onClick={handleRegister}
            color="primary"
          >
            Submit
          </Button>
          <Button onClick={handleFormCancel} color="secondary">
            Cancel
          </Button>
        </ButtonGroup>
        <p>{error}</p>
      </form>
      <ButtonGroup
        style={{
          display: 'flex',
          flexDirection: 'column',
        }}
        aria-label="outlined primary button group"
      >
        <Button
          style={{
            margin: '0 0 10px',
            border: '1px solid',
            padding: 15,
          }}
          color="primary"
        >
          Sign up with FaceBook
        </Button>
        <Button
          style={{
            margin: '0 0 10px',
            border: '1px solid',
            padding: 15,
          }}
          color="primary"
        >
          Sign up with Google
        </Button>
      </ButtonGroup>
    </Box>
  );
}

export default EmployerRegister;