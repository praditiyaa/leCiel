const errorHandler = (err, req, res, next) => {
  let status = 500;
  let message = 'Internal Server Error';

  if (
    err.name === 'SequelizeValidationError' ||
    err.name === 'SequelizeUniqueConstraintError' ||
    err.name === 'SequelizeDatabaseError'
  ) {
    const objErr = {};

    err.errors.forEach((data) => {
      const key = data.path;
      if (!objErr[key]) {
        objErr[key] = data.message;
      }
    });

    status = 400;
    message = objErr;
  }

  if (err.message === 'emptyEmail') {
    status = 400;
    message = 'Email is Required';
  }

  if (err.message === 'emptyPass') {
    status = 400;
    message = 'Password is Required';
  }

  if (err.message === 'LoginError') {
    status = 401;
    message = 'Wrong email or password';
  }

  if (err.message === 'Unauthenticate') {
    status = 401;
    message = 'Need to Login First';
  }

  if (err.name === 'JsonWebTokenError') {
    status = 401;
    message = 'Invalid Token';
  }

  if (err.message === 'Forbidden') {
    status = 403;
    message = 'You Have No Access';
  }

  if (err.message === 'IdNotFound') {
    status = 404;
    message = 'Id Not Found';
  }

  if (err.message === 'NotFound') {
    status = 404;
    message = 'Data Not Found';
  }

  res.status(status).json({ message });
};

module.exports = errorHandler;
