import PropTypes from 'prop-types';
import css from './Filter.module.css';

function Filter({ newFilter }) {
  return (
    <div className={css.wrapFilter}>
      <div className={css.p}>Find contacts by name</div>
      <input type="text" placeholder="Search" onChange={newFilter} />
    </div>
  );
}
export default Filter;

Filter.propTypes = {
  newFilter: PropTypes.func.isRequired,
};
