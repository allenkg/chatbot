import React, { useState } from 'react';
import {withStyles} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import PropTypes from 'prop-types';


const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    minWidth: "60%",
    minHeight: "20%"
  },
  dense: {
    marginTop: 16,
  },
  menu: {
    width: 200,
  },
  button: {
    margin: theme.spacing.unit,
  },
  rightIcon: {
    marginLeft: theme.spacing.unit,
  },
});


function MessageComponent(props) {

  const {classes, sendMessage } = props;
  const [message, setMessage] = useState("");

  function changeHandler(event) {
    setMessage(event.target.value);
  }

  function handleClick() {
    sendMessage(message);
    setMessage("")
  }

  return (
    <div className={classes.container}>
      <TextField
        id="outlined-textarea"
        label="Message"
        placeholder="Type the message"
        multiline
        className={classes.textField}
        margin="normal"
        variant="outlined"
        onChange={changeHandler}
        value={message}
      />
      <Button variant="contained" color="primary" className={classes.button} onClick={handleClick}>
        Send
        <Icon className={classes.rightIcon}>send</Icon>
      </Button>
    </div>
  );
}

MessageComponent.propTypes = {
  classes: PropTypes.object.isRequired,
  sendMessage: PropTypes.func.isRequired
};

export default withStyles(styles)(MessageComponent);