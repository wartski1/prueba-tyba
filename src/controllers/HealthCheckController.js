const HealthCheckController = module.exports;

const { APP_NAME } = process.env;

HealthCheckController.status = async (req, res, next) => {
  return res.send({
    name: `${APP_NAME}`,
    time: Date.now(),
    status: 'OK',
  }).status(200);
};
