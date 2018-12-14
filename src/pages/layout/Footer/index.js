// External Dependencies
import { connect } from 'react-redux';

// Internal Dependencies
import Footer from './Footer';

const mapStateToProps = (state) => state.layout.Footer;

export default connect(mapStateToProps)(Footer);
