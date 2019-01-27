import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import FormLabel from '@material-ui/core/FormLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from "./AppBar";
import MessageComponent from "./MessageComponent";
import classNames from "classnames";

const styles = theme => ({
  root: {
    marginTop: "1%",
    display: "flex",
    alignContent: "center",
  },
  paper: {
    height: 140,
    width: 100,
  },
  control: {
    padding: theme.spacing.unit * 2,
  },
  snackbar: {
    backgroundColor: "#64ffda",
    color: "black",
    margin: "20px",
    marginLeft: "30%",
    width: "40%"
  },
  answer: {
    backgroundColor: "#fff",
    color: "black",
    width: "40%",
  },
  main: {
    height: "100%",
  },
  bottom: {
    marginTop: "1%",
  }
});


class MainPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: props.messages,
      answers: props.answers,
    }
  }

  static propTypes = {
    messages: PropTypes.array.isRequired,
    actions: PropTypes.shape({
      fetchData: PropTypes.func.isRequired,
      sendMessage: PropTypes.func.isRequired,
    })
  };

  componentDidMount() {
    this.props.actions.fetchData().then(() => {
      this.setState({messages: this.props.messages})
    })
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.messages !== prevProps.messages) {
      this.setState({ messages: this.props.messages })
    }
    if (this.props.answers !== prevProps.answers) {
      this.setState({ answers: this.props.answers })
    }
  }



  render() {
    const {messages} = this.state;
    const {classes, actions } = this.props;

    return (
      <React.Fragment>
        <CssBaseline/>
        <AppBar/>
        <Grid container xs={12} className={classes.root}>
          <Grid container>
            <Grid item xs={12} className={classes.main} justify="center">
              <Paper className={classes.control}>
                {messages.map(message =>
                <Grid item xs={8}>
                      <SnackbarContent className={classes.snackbar} message={message.question}/>
                      {message.answer > 0 && <SnackbarContent className={classes.answer} message={message.answer}/>}
                </Grid>
                )}

              </Paper>
              <Grid item xs={12} className={classes.bottom}>
                <Paper className={classes.control}>
                  <MessageComponent sendMessage={actions.sendMessage}/>
                </Paper>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(MainPage);