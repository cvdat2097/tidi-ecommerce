import { connect } from 'react-redux';
import Actions from '../duck/actions';
import Auth from './Auth';

const mapStateToProps = (state) => {
    return state.common.Auth;
};

const mapDispatchToProps = (dispatch) => ({
    changeLoginStatus: (status) => {
        dispatch(Actions.updateAuthStatus({
            isLoggedIn: status
        }));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
