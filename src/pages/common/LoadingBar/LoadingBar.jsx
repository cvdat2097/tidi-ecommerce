// StyleSheets
import './LoadingBar.scss';

// External Dependencies
import React from 'react';
import PropTypes from 'prop-types';


const INTITIAL_STATE = {
    percent: 100,
    loadingInterval: null
}


class LoadingBar extends React.Component {
    static propTyeps = {
        loadingBarHeight: PropTypes.number
    }

    static defaultProps = {
        loadingBarHeight: 3
    }

    constructor(props) {
        super(props);

        this.state = INTITIAL_STATE;
    }

    componentDidMount() {
        this.startLoadingBar();
    }

    componentWillUnmount() {
        this.stopLoadingBar();
    }

    startLoadingBar() {
        this.setState({
            loadingInterval: setInterval(() => {
                this.setState({
                    percent: this.state.percent + 1
                });
                if (this.state.percent > 80) {
                    clearInterval(this.state.loadingInterval);
                }
            }, 50)
        });
    }

    stopLoadingBar() {
        this.setState({
            percent: 100
        });
        clearInterval(this.state.loadingInterval);
    }

    render() {
        return (
            <div id="tidi-loading-bar" className="progress" style={{ height: this.props.loadingBarHeight }}>
                <div className="progress-bar progress-bar-striped progress-bar-animated bg-info" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100"
                    style={{ width: this.state.percent + "%" }}>
                </div>
            </div >
        );
    }
}

export default LoadingBar;
