import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Grid } from '@material-ui/core';
import TweetButton from './TweetButton';

class ControlledExpansionPanels extends React.Component {
  constructor() {
    super();
    this.state = {
      expanded: null,
    };
    this.rankingCount = 0;
  }

  //   handleChange = panel => (event, expanded) => {
  //     this.setState({
  //       expanded: expanded ? panel : false,
  //     });
  //   };

  handleChange(panel) {
    this.setState({ expanded: this.state.expanded ? false : panel });
  }

  rankingCountUp() {
    const rankingCount = this.rankingCount >= 10 ? 0 : this.rankingCount;
    this.rankingCount = rankingCount + 1;
    return this.rankingCount;
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        {this.props.selectedAgeListData.map(tile => (
          <ExpansionPanel
            key={tile.title}
            expanded={this.state.expanded === tile.title}
            onChange={() => {
              this.handleChange(tile.title);
            }}
          >
            <ExpansionPanelSummary
              expandIcon={<ExpandMoreIcon />}
              style={{ padding: '0 10px 0 10px' }}
            >
              <div className={classes.rankHeading}>
                {this.rankingCountUp()}位
              </div>
              <div className={classes.heading}>{tile.title}</div>
              <div className={classes.secondaryHeading}>{tile.singer}</div>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails
              style={{ height: '250px', padding: '4px 12px 12px' }}
            >
              <Grid container justify="center">
                <Grid item xs={12} sm={3} style={{ height: '190px' }}>
                  <iframe
                    width="100%"
                    height="100%"
                    src={tile.url}
                    frameBorder="0"
                    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </Grid>
                <Grid item xs={12} sm={9} style={{ height: '40px' }}>
                  <div
                    style={{
                      display: 'flex',
                      // justifyContent: 'flex-end',
                      marginTop: '1vmin',
                      marginLeft: '10px',
                      // width: '50%',
                    }}
                  >
                    <TweetButton />
                  </div>
                </Grid>
              </Grid>
            </ExpansionPanelDetails>
          </ExpansionPanel>
        ))}
      </div>
    );
  }
}

ControlledExpansionPanels.propTypes = {
  classes: PropTypes.object.isRequired,
  selectedAgeListData: PropTypes.array,
};

const styles = theme => ({
  root: {
    width: '100%',
  },
  rankHeading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '10%',
    flexShrink: 0,
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '40%',
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
});

export default withStyles(styles)(ControlledExpansionPanels);
