import { connect } from 'react-redux';
import Footer from './Footer';

const mapStateToProps = (state) => state.layout.Footer;
const mapDispatchToProps = (dispatch) => ({
   
});

export default connect(mapStateToProps, mapDispatchToProps)(Footer);
