import React from 'react';
import './LoadingBar.scss';

const INTITIAL_STATE = {
    percent: 0,
    loadingInterval: null
}

export default class LoadingBar extends React.Component {
    constructor(props) {
        super(props);

        this.state = INTITIAL_STATE;
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
        })
    }

    stopLoadingBar() {
        this.setState({
            percent: 0
        });
        clearInterval(this.state.loadingInterval);
    }

    componentDidMount() {
        this.startLoadingBar();
    }

    componentWillUnmount() {
        this.stopLoadingBar();
    }

    render() {
        return (
            <div id="tidi-loading-bar" className="progress" style={{ height: this.props.loadingBarHeight || 3 }}>
                <div className="progress-bar progress-bar-striped progress-bar-animated bg-info" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100"
                    style={{ width: this.state.percent + "%" }}>
                </div>
            </div >
        );
    }
}
