import React from 'react';
import PropTypes from 'prop-types';

function WithListLoading(Component) {
  return function WihLoadingComponent({ isLoading, ...props }) {
    if (!isLoading) return <Component {...props} />;
    return (
      <p style={{ textAlign: 'center', fontSize: '30px' }}>
        Hold on, fetching data may take some time :)
      </p>
    );
  };
}
WithListLoading.propTypes = {
  isLoading: PropTypes.boolean.isRequired,
};
export default WithListLoading;
